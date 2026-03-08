export type PlaceCategory = 'nature' | 'historical' | 'trail' | 'city';
export type PlaceRegion = 'north' | 'center' | 'jerusalem' | 'south' | 'judea';
export type TrailDifficulty = 'easy' | 'moderate' | 'hard' | null;

export interface PlaceMarker {
  _id: string;
  name: string;
  category: PlaceCategory;
  region: PlaceRegion;
  coordinates: { lat: number; lng: number };
}

export interface Place {
  _id: string;
  name: string;
  aliases: string[];
  category: PlaceCategory;
  description: string;
  coordinates: { lat: number; lng: number };
  region: PlaceRegion;
  difficulty: TrailDifficulty;
  images: string[];
  externalUrl: string;
  visitorsCount: number;
}

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  nature: 'טבע',
  historical: 'מורשת',
  trail: 'מסלול',
  city: 'עיר'
};

export const DIFFICULTY_LABELS: Record<NonNullable<TrailDifficulty>, string> = {
  easy: 'קל',
  moderate: 'בינוני',
  hard: 'קשה'
};

export const REGION_LABELS: Record<PlaceRegion, string> = {
  north: 'צפון',
  center: 'מרכז',
  jerusalem: 'ירושלים',
  south: 'דרום',
  judea: 'יהודה ושומרון'
};

export interface FilterState {
  categories: PlaceCategory[];
  region: PlaceRegion | null;
  showVisited: boolean;
}
