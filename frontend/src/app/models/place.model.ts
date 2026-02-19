export type PlaceCategory = 'nature' | 'historical' | 'trail' | 'city';
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
  historical: 'מורשת',
  trail: 'מסלול',
  city: 'עיר'
};

export const REGION_LABELS: Record<PlaceRegion, string> = {
  north: 'North',
  center: 'Center',
  jerusalem: 'Jerusalem',
  south: 'South',
  eilat: 'Eilat'
};
