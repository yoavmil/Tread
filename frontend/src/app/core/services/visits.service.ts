import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class VisitsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  markVisited(placeId: string): Observable<{ visitedPlaces: string[] }> {
    return this.http.post<{ visitedPlaces: string[] }>('/api/users/me/visits', { placeId }).pipe(
      tap(() => this.auth.markVisited(placeId))
    );
  }

  unmarkVisited(placeId: string): Observable<{ visitedPlaces: string[] }> {
    return this.http.delete<{ visitedPlaces: string[] }>(`/api/users/me/visits/${placeId}`).pipe(
      tap(() => this.auth.unmarkVisited(placeId))
    );
  }
}
