export type PlaceCategory = 'nature' | 'historical' | 'trail' | 'beach' | 'city';
export type PlaceRegion = 'north' | 'center' | 'jerusalem' | 'south' | 'eilat';
export type TrailDifficulty = 'easy' | 'moderate' | 'hard' | null;

export interface Place {
  _id: string;
  name: string;
  nameHe: string;
  category: PlaceCategory;
  description: string;
  coordinates: { lat: number; lng: number };
  region: PlaceRegion;
  difficulty: TrailDifficulty;
  images: string[];
  externalUrl: string;
}

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  nature: 'טבע',
  historical: 'היסטורי',
  trail: 'מסלול' ,
  beach: 'חוף',
  city: 'עיר'
};

export const CATEGORY_COLORS: Record<PlaceCategory, string> = {
  nature: '#2e7d32',
  historical: '#b8860b',
  trail: '#e65100',
  beach: '#0277bd',
  city: '#6a1b9a'
};

export const REGION_LABELS: Record<PlaceRegion, string> = {
  north: 'North',
  center: 'Center',
  jerusalem: 'Jerusalem',
  south: 'South',
  eilat: 'Eilat'
};
