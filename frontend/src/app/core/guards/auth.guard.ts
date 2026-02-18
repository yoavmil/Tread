import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.getToken()) return router.createUrlTree(['/login']);

  // User already loaded (e.g. navigating between protected pages)
  if (auth.user()) return true;

  try {
    await firstValueFrom(auth.loadUser());
    return true;
  } catch {
    auth.logout();
    return router.createUrlTree(['/login']);
  }
};
