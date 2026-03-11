import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';

function makeMockAuth(opts: { hasToken: boolean; loadResult: 'ok' | 'fail' }) {
  return {
    getToken: jest.fn().mockReturnValue(opts.hasToken ? 'tok' : null),
    loadUser: jest.fn().mockReturnValue(
      opts.loadResult === 'ok' ? of({}) : throwError(() => new Error('401'))
    ),
    clearSession: jest.fn(),
  };
}

async function mountApp(mock: ReturnType<typeof makeMockAuth>) {
  TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [
      provideRouter([]),
      { provide: AuthService, useValue: mock },
    ],
  });
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  return mock;
}

describe('AppComponent bootstrap auth', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('calls loadUser() when a token is present', async () => {
    const mock = await mountApp(makeMockAuth({ hasToken: true, loadResult: 'ok' }));
    expect(mock.loadUser).toHaveBeenCalledTimes(1);
    expect(mock.clearSession).not.toHaveBeenCalled();
  });

  it('calls clearSession() when loadUser() fails', async () => {
    const mock = await mountApp(makeMockAuth({ hasToken: true, loadResult: 'fail' }));
    expect(mock.loadUser).toHaveBeenCalledTimes(1);
    expect(mock.clearSession).toHaveBeenCalledTimes(1);
  });

  it('does not call loadUser() when no token is present', async () => {
    const mock = await mountApp(makeMockAuth({ hasToken: false, loadResult: 'ok' }));
    expect(mock.loadUser).not.toHaveBeenCalled();
  });
});
