import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';

const TOKEN_KEY = 'tread_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly visitedPlaceIds = computed(() => new Set(this._user()?.visitedPlaces ?? []));

  constructor(private http: HttpClient, private router: Router) {
    // Restore session on startup
    if (this.getToken()) {
      this.loadUser().subscribe({ error: () => this.logout() });
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  storeToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  loadUser() {
    return this.http.get<User>('/api/users/me').pipe(
      tap(user => this._user.set(user))
    );
  }

  markVisited(placeId: string): void {
    const user = this._user();
    if (!user) return;
    if (!user.visitedPlaces.includes(placeId)) {
      this._user.set({ ...user, visitedPlaces: [...user.visitedPlaces, placeId] });
    }
  }

  unmarkVisited(placeId: string): void {
    const user = this._user();
    if (!user) return;
    this._user.set({ ...user, visitedPlaces: user.visitedPlaces.filter(id => id !== placeId) });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
  }
}
