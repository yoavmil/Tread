import { TestBed } from '@angular/core/testing';
import { provideRouter, UrlTree } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

function makeMockAuth(opts: {
  token: string | null;
  userLoaded?: boolean;
  loadResult?: 'ok' | 'fail';
}) {
  const { token, userLoaded = false, loadResult = 'ok' } = opts;
  const FAKE_USER = { _id: 'u1', email: 'x@x.com', displayName: 'X', photo: '', visitedPlaces: [], createdAt: '' };
  return {
    getToken: jest.fn().mockReturnValue(token),
    user: signal(userLoaded ? FAKE_USER : null),
    loadUser: jest.fn().mockReturnValue(
      loadResult === 'ok' ? of(FAKE_USER) : throwError(() => new Error('401'))
    ),
    clearSession: jest.fn(),
  };
}

const mockDialog = { open: jest.fn() };

async function runGuard(mock: ReturnType<typeof makeMockAuth>) {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: AuthService, useValue: mock },
      { provide: MatDialog, useValue: mockDialog },
    ],
  });
  return TestBed.runInInjectionContext(() =>
    authGuard({} as any, {} as any)
  );
}

describe('authGuard', () => {
  beforeEach(() => mockDialog.open.mockClear());
  afterEach(() => TestBed.resetTestingModule());

  it('opens login dialog and redirects to /map when there is no token', async () => {
    const result = await runGuard(makeMockAuth({ token: null }));
    expect(mockDialog.open).toHaveBeenCalled();
    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toBe('/map');
  });

  it('returns true immediately when token + user are already loaded', async () => {
    const mock = makeMockAuth({ token: 'tok', userLoaded: true });
    const result = await runGuard(mock);
    expect(result).toBe(true);
    expect(mock.loadUser).not.toHaveBeenCalled();
  });

  it('returns true when token present and loadUser() succeeds', async () => {
    const mock = makeMockAuth({ token: 'tok', userLoaded: false, loadResult: 'ok' });
    const result = await runGuard(mock);
    expect(result).toBe(true);
    expect(mock.loadUser).toHaveBeenCalled();
  });

  it('calls clearSession(), opens login dialog and redirects to /map when loadUser() fails', async () => {
    const mock = makeMockAuth({ token: 'tok', userLoaded: false, loadResult: 'fail' });
    const result = await runGuard(mock);
    expect(mock.clearSession).toHaveBeenCalled();
    expect(mockDialog.open).toHaveBeenCalled();
    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toBe('/map');
  });
});
