import { Place } from './place.model';

export interface EditSubmissionSummary {
  _id: string;
  placeId: { _id: string; name: string };
  submittedBy: { _id: string; displayName: string; email: string };
  createdAt: string;
}

export interface EditSubmission extends EditSubmissionSummary {
  before: Partial<Place> & { _id: string };
  after: Partial<Place>;
  status: 'pending' | 'accepted' | 'declined';
}
