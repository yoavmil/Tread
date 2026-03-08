import { Place } from './place.model';

export interface EditSubmissionSummary {
  _id: string;
  placeId: { _id: string; name: string };
  submittedBy: { _id: string; displayName: string; email: string };
  createdAt: string;
}

export interface EditSubmission extends EditSubmissionSummary {
  type?: 'edit';
  before: Partial<Place> & { _id: string };
  after: Partial<Place>;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ReviewItemSummary {
  _id: string;
  type: 'edit' | 'erase';
  placeId: { _id: string; name: string };
  submittedBy: { _id: string; displayName: string; email: string };
  createdAt: string;
}

export interface EraseDetail {
  _id: string;
  type: 'erase';
  placeId: { _id: string; name: string };
  reason: string;
  submittedBy: { _id: string; displayName: string; email: string };
  createdAt: string;
}

export type ReviewDetail = (EditSubmission & { type: 'edit' }) | EraseDetail;

interface UnifiedReviewBase {
  _id: string;
  submittedBy: { _id: string; displayName: string; email: string };
  createdAt: string;
}

export interface UnifiedNewItem extends UnifiedReviewBase {
  type: 'new';
  placeName: string;
}

export interface UnifiedEditItem extends UnifiedReviewBase {
  type: 'edit';
  placeId: { _id: string; name: string };
}

export interface UnifiedEraseItem extends UnifiedReviewBase {
  type: 'erase';
  placeId: { _id: string; name: string };
  reason: string;
}

export type UnifiedReviewItem = UnifiedNewItem | UnifiedEditItem | UnifiedEraseItem;
