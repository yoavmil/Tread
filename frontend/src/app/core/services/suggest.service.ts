import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';

@Injectable({ providedIn: 'root' })
export class SuggestService {
  constructor(private http: HttpClient) {}

  submitEdit(before: Place, after: Partial<Place>): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>('/api/suggest-edit', { before, after });
  }

  submitNew(place: Record<string, unknown>): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>('/api/suggest-new', { place });
  }
}
