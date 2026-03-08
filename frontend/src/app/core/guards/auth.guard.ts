import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginDialogComponent } from '../../features/login/login-dialog.component';

const openLoginDialog = (dialog: MatDialog, router: Router) => {
  dialog.open(LoginDialogComponent, { width: '380px', autoFocus: false });
  return router.createUrlTree(['/map']);
};

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  if (!auth.getToken()) return openLoginDialog(dialog, router);

  // User already loaded (e.g. navigating between protected pages)
  if (auth.user()) return true;

  try {
    await firstValueFrom(auth.loadUser());
    return true;
  } catch {
    auth.clearSession();
    return openLoginDialog(dialog, router);
  }
};
