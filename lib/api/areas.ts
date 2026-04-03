const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type HeatmapMetric = 'hmo_score' | 'average_yield' | 'demand' | 'article4';

export interface HeatmapData {
  [code: string]: number;
}

export interface PostcodeDistrict {
  id: number;
  code: string;
  name: string;
  post_town: string;
  region: string;
  uk_region: string;
  latitude: number | null;
  longitude: number | null;
  population: number | null;
  households: number | null;
  hmo_score: number;
  average_yield: number | null;
  average_price: number | null;
  average_rent: number | null;
  demand_score: number;
  transport_score: number;
  has_article_4: boolean;
  council_attitude_score: number;
  student_area: boolean;
}

export interface RankingsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PostcodeDistrict[];
}

export interface RankingsOptions {
  sort_by?: 'hmo_score' | 'average_yield' | 'average_price' | 'transport_score';
  order?: 'asc' | 'desc';
  region?: string;
  min_score?: number;
  min_yield?: number;
  min_demand?: number;
  page?: number;
  page_size?: number;
}

/**
 * Fetches heatmap data as a dictionary mapping postcode codes to metric values
 */
export async function fetchHeatmapData(metric: HeatmapMetric = 'hmo_score'): Promise<HeatmapData> {
  const response = await fetch(`${API_BASE_URL}/api/areas/heatmap/?metric=${metric}`);

  if (!response.ok) {
    throw new Error('Failed to fetch heatmap data');
  }

  return response.json();
}

/**
 * Fetches full details for a single area by postcode code
 */
export async function fetchAreaDetail(code: string): Promise<PostcodeDistrict> {
  const response = await fetch(`${API_BASE_URL}/api/areas/detail/?code=${encodeURIComponent(code)}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Area with code ${code} not found`);
    }
    throw new Error('Failed to fetch area detail');
  }

  return response.json();
}

/**
 * Fetches paginated ranked list of areas
 */
export async function fetchAreaRankings(options: RankingsOptions = {}): Promise<RankingsResponse> {
  const params = new URLSearchParams();

  if (options.sort_by) params.append('sort_by', options.sort_by);
  if (options.order) params.append('order', options.order);
  if (options.region) params.append('region', options.region);
  if (options.min_score) params.append('min_score', options.min_score.toString());
  if (options.min_yield) params.append('min_yield', options.min_yield.toString());
  if (options.min_demand) params.append('min_demand', options.min_demand.toString());
  if (options.page) params.append('page', options.page.toString());
  if (options.page_size) params.append('page_size', options.page_size.toString());

  const response = await fetch(`${API_BASE_URL}/api/areas/rankings/?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch area rankings');
  }

  return response.json();
}

/**
 * Fetches GeoJSON from the backend API.
 * Returns only areas that exist in the database with coordinates.
 */
export async function fetchAreasGeoJSON(): Promise<GeoJSON.FeatureCollection> {
  const response = await fetch(`${API_BASE_URL}/api/areas/geojson/`);

  if (!response.ok) {
    throw new Error('Failed to fetch areas GeoJSON');
  }

  return response.json();
}

/**
 * @deprecated Use fetchAreasGeoJSON() instead.
 * Fetches GeoJSON boundaries for UK postcode districts
 * Falls back to generating point-based features from rankings data
 */
export async function fetchGeoJSON(): Promise<GeoJSON.FeatureCollection> {
  // Use the new backend endpoint that returns only areas in database
  return fetchAreasGeoJSON();
}
