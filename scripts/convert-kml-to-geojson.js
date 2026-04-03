const fs = require('fs');
const path = require('path');
const { kml } = require('@tmcw/togeojson');
const { DOMParser } = require('xmldom');

// File paths
const kmlPath = path.join(__dirname, '../public/geo/UK Postcode Districts (1).kml');
const jsonPath = path.join(__dirname, '../public/geo/UK Postcode Districts (1).json');
const outputPath = path.join(__dirname, '../public/geo/uk-postcode-districts.json');

console.log('Reading KML file...');
const kmlContent = fs.readFileSync(kmlPath, 'utf8');

console.log('Parsing KML...');
const dom = new DOMParser().parseFromString(kmlContent);

console.log('Converting to GeoJSON...');
const geoJson = kml(dom);

console.log(`Found ${geoJson.features.length} features in KML`);

// Read the JSON file with metadata
console.log('Reading metadata JSON file...');
const metadataJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Create a lookup map from the metadata
const metadataMap = {};
for (const feature of metadataJson.features) {
  const code = feature.properties.name; // In the JSON, 'name' contains the postcode code
  metadataMap[code] = {
    description: feature.properties.description,
    ukRegion: feature.properties.ukRegion,
    population: feature.properties.population,
    households: feature.properties.households,
    postcodes: feature.properties.postcodes,
    active: feature.properties.active,
  };
}

console.log(`Found ${Object.keys(metadataMap).length} metadata entries`);

// Process features - map properties and merge metadata
const processedFeatures = geoJson.features.map((feature) => {
  // The KML uses 'name' for the postcode code
  const code = feature.properties.name;
  const metadata = metadataMap[code] || {};

  // Parse description to get area name
  let areaName = '';
  if (metadata.description) {
    // Description format: "Aberdeen city centre, Bridge of Dee, Mannofield, Aberdeen\r\n"
    const parts = metadata.description.replace(/\r?\n/g, '').split(',');
    areaName = parts[0]?.trim() || code;
  } else {
    areaName = code;
  }

  return {
    type: 'Feature',
    properties: {
      code: code,
      name: areaName,
      region: metadata.ukRegion || 'Unknown',
      population: metadata.population || 0,
      households: metadata.households || 0,
    },
    geometry: feature.geometry,
  };
});

// Filter out any features without valid geometry
const validFeatures = processedFeatures.filter(
  (f) => f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon')
);

console.log(`${validFeatures.length} features with valid polygon geometry`);

const outputGeoJson = {
  type: 'FeatureCollection',
  features: validFeatures,
};

// Write output
console.log('Writing output file...');
fs.writeFileSync(outputPath, JSON.stringify(outputGeoJson, null, 2));

console.log(`Done! Output written to ${outputPath}`);
console.log(`Total features: ${validFeatures.length}`);
