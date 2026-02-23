import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../../models/place.model';
import { NewSubmission } from '../../models/new-submission.model';

@Injectable({ providedIn: 'root' })
export class SubmissionsService {
  constructor(private http: HttpClient) {}

  getPending() {
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
}
