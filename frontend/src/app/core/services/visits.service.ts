import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface VisitResponse {
  visitedPlaces: string[];
  visitorsCount: number;
}

@Injectable({ providedIn: 'root' })
export class VisitsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  markVisited(placeId: string): Observable<VisitResponse> {
    return this.http.post<VisitResponse>('/api/users/me/visits', { placeId }).pipe(
      tap(() => this.auth.markVisited(placeId))
    );
  }

  unmarkVisited(placeId: string): Observable<VisitResponse> {
    return this.http.delete<VisitResponse>(`/api/users/me/visits/${placeId}`).pipe(
      tap(() => this.auth.unmarkVisited(placeId))
    );
  }
}
