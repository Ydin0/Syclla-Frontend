#!/usr/bin/env node
/**
 * Download and process UK Westminster Parliamentary Constituencies from UK-GeoJSON
 * Converts TopoJSON to GeoJSON with simplified coordinates
 */

import * as topojson from 'topojson-client';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const TOPO_URL = 'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/electoral/gb/topo_wpc.json';
const PRECISION = 4; // 4 decimal places (~10m accuracy)

async function fetchJSON(url) {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json();
}

function roundCoord(coord) {
  const factor = Math.pow(10, PRECISION);
  return Math.round(coord * factor) / factor;
}

function simplifyCoordinates(coords) {
  if (typeof coords[0] === 'number') {
    return [roundCoord(coords[0]), roundCoord(coords[1])];
  }
  return coords.map(simplifyCoordinates);
}

function simplifyGeometry(geometry) {
  return {
    type: geometry.type,
    coordinates: simplifyCoordinates(geometry.coordinates),
  };
}

async function main() {
  console.log('Processing UK Westminster Parliamentary Constituencies...\n');

  try {
    const topoData = await fetchJSON(TOPO_URL);

    const objectKeys = Object.keys(topoData.objects);
    console.log(`Available objects: ${objectKeys.join(', ')}`);

    const objectKey = objectKeys[0];
    console.log(`Using object key: ${objectKey}`);

    const geoJson = topojson.feature(topoData, topoData.objects[objectKey]);
    console.log(`Converted ${geoJson.features.length} constituencies to GeoJSON`);

    // Log sample feature
    if (geoJson.features.length > 0) {
      console.log('\nSample feature properties:');
      console.log(JSON.stringify(geoJson.features[0].properties, null, 2));
    }

    // Standardize properties and simplify
    const processedGeoJson = {
      type: 'FeatureCollection',
      features: geoJson.features.map(feature => ({
        type: 'Feature',
        properties: {
          code: feature.properties.PCON13CD || feature.properties.pcon13cd || feature.properties.code,
          name: feature.properties.PCON13NM || feature.properties.pcon13nm || feature.properties.name,
        },
        geometry: simplifyGeometry(feature.geometry),
      })),
    };

    const outputPath = './public/geo/uk-constituencies.json';
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, JSON.stringify(processedGeoJson));

    const sizeKB = (JSON.stringify(processedGeoJson).length / 1024).toFixed(1);
    const sizeMB = (JSON.stringify(processedGeoJson).length / 1024 / 1024).toFixed(2);
    console.log(`\nWrote ${processedGeoJson.features.length} constituencies to ${outputPath}`);
    console.log(`File size: ${sizeKB} KB (${sizeMB} MB)`);

    // List sample constituencies
    console.log('\nSample constituencies:');
    processedGeoJson.features.slice(0, 10).forEach(f => {
      console.log(`  ${f.properties.code}: ${f.properties.name}`);
    });

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
