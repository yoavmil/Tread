import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../../models/place.model';
import { NewSubmission } from '../../models/new-submission.model';
import { EditSubmissionSummary, EditSubmission, EraseDetail } from '../../models/edit-submission.model';

@Injectable({ providedIn: 'root' })
export class SubmissionsService {
  constructor(private http: HttpClient) {}

  getPendingNew() {
    return this.http.get<NewSubmission[]>('/api/submissions/new');
  }

  getById(id: string) {
    return this.http.get<NewSubmission>(`/api/submissions/new/${id}`);
  }

  updatePlaceData(id: string, placeData: Partial<Place> & { name: string }) {
    return this.http.patch<{ ok: boolean }>(`/api/submissions/new/${id}`, { placeData });
  }

  approve(id: string) {
    return this.http.post<{ ok: boolean; placeId: string }>(`/api/submissions/new/${id}/approve`, {});
  }

  decline(id: string) {
    return this.http.post<{ ok: boolean }>(`/api/submissions/new/${id}/decline`, {});
  }

  getPendingEdits() {
    return this.http.get<EditSubmissionSummary[]>('/api/submissions/edit');
  }

  getEditById(id: string) {
    return this.http.get<EditSubmission>(`/api/submissions/edit/${id}`);
  }

  approveEdit(id: string) {
    return this.http.post<{ ok: boolean; placeId: string }>(`/api/submissions/edit/${id}/approve`, {});
  }

  declineEdit(id: string) {
    return this.http.post<{ ok: boolean }>(`/api/submissions/edit/${id}/decline`, {});
  }

  getPendingErases() {
    return this.http.get<Omit<EraseDetail, 'type'>[]>('/api/submissions/erase');
  }

  getEraseById(id: string) {
    return this.http.get<Omit<EraseDetail, 'type'>>(`/api/submissions/erase/${id}`);
  }

  approveErase(id: string) {
    return this.http.post<{ ok: boolean; placeId: string }>(`/api/submissions/erase/${id}/approve`, {});
  }

  declineErase(id: string) {
    return this.http.post<{ ok: boolean }>(`/api/submissions/erase/${id}/decline`, {});
  }
}
