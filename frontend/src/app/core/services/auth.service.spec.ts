import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../../models/user.model';

const MOCK_USER: User = {
  _id: 'u1',
  email: 'test@example.com',
  displayName: 'Test User',
  photo: '',
  visitedPlaces: ['p1', 'p2'],
  role: 'editor',
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  // ── token management ──────────────────────────────────────────────────────

  describe('getToken / storeToken', () => {
    it('returns null when no token is stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('returns the stored token after storeToken()', () => {
      service.storeToken('abc123');
      expect(service.getToken()).toBe('abc123');
    });
  });

  // ── signals ───────────────────────────────────────────────────────────────

  describe('signals (initial state)', () => {
    it('isLoggedIn is false initially', () => {
      expect(service.isLoggedIn()).toBe(false);
    });

    it('visitedPlaceIds is an empty set initially', () => {
      expect(service.visitedPlaceIds().size).toBe(0);
    });
  });

  // ── loadUser() ────────────────────────────────────────────────────────────

  describe('loadUser()', () => {
    it('GETs /api/users/me and sets the user signal', () => {
      service.loadUser().subscribe();
      http.expectOne('/api/users/me').flush(MOCK_USER);

      expect(service.user()).toEqual(MOCK_USER);
      expect(service.isLoggedIn()).toBe(true);
      expect(service.visitedPlaceIds()).toEqual(new Set(['p1', 'p2']));
    });
  });

  // ── markVisited() ─────────────────────────────────────────────────────────

  describe('markVisited()', () => {
    beforeEach(() => {
      service.loadUser().subscribe();
      http.expectOne('/api/users/me').flush(MOCK_USER);
    });

    it('adds a new placeId to visitedPlaces', () => {
      service.markVisited('p3');
      expect(service.visitedPlaceIds().has('p3')).toBe(true);
    });

    it('does not duplicate an already-visited place', () => {
      service.markVisited('p1');
      const ids = service.user()!.visitedPlaces;
      expect(ids.filter(id => id === 'p1').length).toBe(1);
    });
  });

  it('markVisited() does nothing when no user is loaded', () => {
    expect(() => service.markVisited('p1')).not.toThrow();
  });

  // ── unmarkVisited() ───────────────────────────────────────────────────────

  describe('unmarkVisited()', () => {
    beforeEach(() => {
      service.loadUser().subscribe();
      http.expectOne('/api/users/me').flush(MOCK_USER);
    });

    it('removes the placeId from visitedPlaces', () => {
      service.unmarkVisited('p1');
      expect(service.visitedPlaceIds().has('p1')).toBe(false);
    });

    it('leaves other visited places intact', () => {
      service.unmarkVisited('p1');
      expect(service.visitedPlaceIds().has('p2')).toBe(true);
    });
  });

  it('unmarkVisited() does nothing when no user is loaded', () => {
    expect(() => service.unmarkVisited('p1')).not.toThrow();
  });

  // ── updateDisplayName() ───────────────────────────────────────────────────

  describe('updateDisplayName()', () => {
    beforeEach(() => {
      service.loadUser().subscribe();
      http.expectOne('/api/users/me').flush(MOCK_USER);
    });

    it('PATCHes /api/users/me with the new display name', () => {
      service.updateDisplayName('New Name').subscribe();
      const req = http.expectOne('/api/users/me');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ displayName: 'New Name' });
      req.flush({ ...MOCK_USER, displayName: 'New Name' });
    });

    it('updates the user signal with the returned user', () => {
      service.updateDisplayName('Updated').subscribe();
      http.expectOne('/api/users/me').flush({ ...MOCK_USER, displayName: 'Updated' });
      expect(service.user()!.displayName).toBe('Updated');
    });

    it('preserves other user fields after the update', () => {
      service.updateDisplayName('Updated').subscribe();
      http.expectOne('/api/users/me').flush({ ...MOCK_USER, displayName: 'Updated' });
      const user = service.user()!;
      expect(user.email).toBe(MOCK_USER.email);
      expect(user.visitedPlaces).toEqual(MOCK_USER.visitedPlaces);
    });
  });

  // ── logout() ──────────────────────────────────────────────────────────────

  describe('logout()', () => {
    it('clears the token, resets the user signal, and navigates to /login', () => {
      service.storeToken('tok');
      service.loadUser().subscribe();
      http.expectOne('/api/users/me').flush(MOCK_USER);

      const navSpy = jest.spyOn(router, 'navigate');
      service.logout();

      expect(service.getToken()).toBeNull();
      expect(service.user()).toBeNull();
      expect(service.isLoggedIn()).toBe(false);
      expect(navSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
