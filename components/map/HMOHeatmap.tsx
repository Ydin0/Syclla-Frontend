'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Map, { Source, Layer, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import type { MapRef, MapMouseEvent, LayerProps } from 'react-map-gl/mapbox';
import { fetchHeatmapData, type HeatmapMetric, type HeatmapData } from '@/lib/api/areas';

interface HMOHeatmapProps {
  selectedMetric: HeatmapMetric;
  article4Filter: boolean;
  onAreaClick?: (code: string) => void;
  className?: string;
}

interface HoverInfo {
  code: string;
  name: string;
  value: number;
  x: number;
  y: number;
}

// Color scale for heatmap (red-orange theme)
const COLOR_SCALE: [number, string][] = [
  [0, '#fef0d9'],   // 0-19: Light cream (Low)
  [20, '#fdcc8a'],  // 20-39: Light orange
  [40, '#fc8d59'],  // 40-49: Orange
  [50, '#e34a33'],  // 50-59: Red-orange
  [60, '#d7301f'],  // 60-69: Red
  [70, '#b30000'],  // 70-79: Dark red
  [80, '#7f0000'],  // 80-89: Darker red (Very Good)
  [90, '#4a0000'],  // 90-100: Darkest red (Excellent)
];

// UK bounds to restrict map view
const UK_BOUNDS: [[number, number], [number, number]] = [
  [-10.5, 49.5],  // Southwest corner (lon, lat)
  [2.5, 61.0]     // Northeast corner (lon, lat)
];

// Binary colour expression for Article 4 overlay
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getArticle4ColorExpression(): any {
  return [
    'case',
    ['==', ['get', 'score'], 1],
    '#f4a4a4', // red — has Article 4
    '#a3d9a5', // green — no Article 4
  ];
}

// Generate interpolate expression for mapbox
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function getColorExpression(_heatmapData: HeatmapData, isArticle4: boolean = false): any {
  if (isArticle4) return getArticle4ColorExpression();
  return [
    'interpolate',
    ['linear'],
    ['coalesce', ['get', 'score'], 50],
    ...COLOR_SCALE.flatMap(([stop, color]) => [stop, color]),
  ];
}

export function HMOHeatmap({ selectedMetric, article4Filter, onAreaClick, className }: HMOHeatmapProps) {
  const mapRef = useRef<MapRef>(null);
  const [geoJson, setGeoJson] = useState<GeoJSON.FeatureCollection | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapData>({});
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // The actual metric to fetch: article4 overlay overrides the metric
  const activeMetric = article4Filter ? 'article4' : selectedMetric;

  // Fetch polygon GeoJSON from static file and heatmap scores from API
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [polygonGeo, data] = await Promise.all([
          fetch('/geo/uk-postcode-districts.json').then(r => r.json()),
          fetchHeatmapData(activeMetric),
        ]);

        // Merge heatmap data into polygon GeoJSON properties
        const enrichedGeo: GeoJSON.FeatureCollection = {
          ...polygonGeo,
          features: polygonGeo.features.map((feature: GeoJSON.Feature) => {
            const code = feature.properties?.code;
            const score = code ? data[code] : undefined;
            return {
              ...feature,
              properties: {
                ...feature.properties,
                score: score ?? (article4Filter ? 0 : 50),
              },
            };
          }),
        };

        setGeoJson(enrichedGeo);
        setHeatmapData(data);
      } catch (err) {
        console.error('Failed to load map data:', err);
        setError('Failed to load map data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activeMetric]);

  // Update GeoJSON when heatmap data changes
  useEffect(() => {
    if (geoJson && Object.keys(heatmapData).length > 0) {
      const updatedGeo: GeoJSON.FeatureCollection = {
        ...geoJson,
        features: geoJson.features.map((feature) => {
          const code = feature.properties?.code;
          const score = code ? heatmapData[code] : undefined;
          return {
            ...feature,
            properties: {
              ...feature.properties,
              score: score ?? (article4Filter ? 0 : 50),
            },
          };
        }),
      };
      setGeoJson(updatedGeo);
    }
  }, [heatmapData]);

  const onHover = useCallback((event: MapMouseEvent) => {
    const feature = event.features?.[0];
    if (feature && feature.properties) {
      const code = feature.properties.code;
      const name = feature.properties.name;
      const score = feature.properties.score;
      setHoverInfo({
        code,
        name,
        value: score,
        x: event.point.x,
        y: event.point.y,
      });
    } else {
      setHoverInfo(null);
    }
  }, []);

  const onClick = useCallback(
    (event: MapMouseEvent) => {
      const feature = event.features?.[0];
      if (feature && feature.properties && onAreaClick) {
        onAreaClick(feature.properties.code);
      }
    },
    [onAreaClick]
  );

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Show placeholder if no token
  if (!mapboxToken) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-[#FAFAFA] ${className}`}>
        <div className="text-center">
          <div className="mb-2 text-sm font-medium text-black/60">Mapbox Token Required</div>
          <div className="text-xs text-black/40">
            Add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-[#FAFAFA] ${className}`}>
        <div className="text-center">
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent mx-auto" />
          <div className="text-xs text-black/50">Loading map data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-[#FAFAFA] ${className}`}>
        <div className="text-center">
          <div className="mb-2 text-sm font-medium text-red-600">{error}</div>
          <div className="text-xs text-black/40">Please check your connection and try again</div>
        </div>
      </div>
    );
  }

  const isA4 = article4Filter;

  // Point layer style (for when using point data)
  const pointLayer: LayerProps = {
    id: 'areas-point',
    type: 'circle',
    source: 'areas',
    filter: ['==', ['geometry-type'], 'Point'],
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5, 8,
        8, 12,
        12, 20,
      ],
      'circle-color': getColorExpression(heatmapData, isA4),
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
      'circle-opacity': 0.9,
    },
  };

  // Polygon fill layer style (for polygon boundaries)
  const fillLayer: LayerProps = {
    id: 'areas-fill',
    type: 'fill',
    source: 'areas',
    filter: ['any',
      ['==', ['geometry-type'], 'Polygon'],
      ['==', ['geometry-type'], 'MultiPolygon']
    ],
    paint: {
      'fill-color': getColorExpression(heatmapData, isA4),
      'fill-opacity': 0.75,
    },
  };

  // Polygon outline layer - dark border for contrast on grayscale map
  const outlineLayer: LayerProps = {
    id: 'areas-outline',
    type: 'line',
    source: 'areas',
    filter: ['any',
      ['==', ['geometry-type'], 'Polygon'],
      ['==', ['geometry-type'], 'MultiPolygon']
    ],
    paint: {
      'line-color': '#374151',  // Dark gray for contrast on light map
      'line-width': 1,
      'line-opacity': 0.6,
    },
  };

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -1.5,
          latitude: 53.0,
          zoom: 5.5,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={mapboxToken}
        maxBounds={UK_BOUNDS}
        interactiveLayerIds={['areas-point', 'areas-fill']}
        onMouseMove={onHover}
        onMouseLeave={() => setHoverInfo(null)}
        onClick={onClick}
        cursor={hoverInfo ? 'pointer' : 'grab'}
      >
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />

        {geoJson && (
          <Source id="areas" type="geojson" data={geoJson}>
            <Layer {...pointLayer} />
            <Layer {...fillLayer} />
            <Layer {...outlineLayer} />
          </Source>
        )}

        {hoverInfo && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-black/10 bg-white px-3 py-2 shadow-lg"
            style={{
              left: hoverInfo.x + 10,
              top: hoverInfo.y + 10,
            }}
          >
            <div className="text-xs font-semibold">{hoverInfo.code}</div>
            <div className="text-[11px] text-black/60">{hoverInfo.name}</div>
            <div className="mt-1 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded"
                style={{
                  backgroundColor: article4Filter
                    ? (hoverInfo.value === 1 ? '#f4a4a4' : '#a3d9a5')
                    : getScoreColor(hoverInfo.value),
                }}
              />
              <span className="text-xs font-medium">
                {article4Filter
                  ? (hoverInfo.value === 1 ? 'Article 4 Applies' : 'No Article 4')
                  : selectedMetric === 'average_yield'
                    ? `${hoverInfo.value.toFixed(1)}%`
                    : hoverInfo.value}
              </span>
            </div>
          </div>
        )}
      </Map>
    </div>
  );
}

function getScoreColor(score: number): string {
  for (let i = COLOR_SCALE.length - 1; i >= 0; i--) {
    if (score >= COLOR_SCALE[i][0]) {
      return COLOR_SCALE[i][1];
    }
  }
  return COLOR_SCALE[0][1];
}
