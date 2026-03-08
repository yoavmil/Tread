import { Place } from './place.model';

export interface NewSubmission {
  _id: string;
  placeData: Partial<Place> & { name: string };
  submittedBy: { _id: string; displayName: string; email: string };
  createdAt: string;
}
