import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const url = req.url.startsWith('/') && environment.apiUrl
    ? environment.apiUrl + req.url
    : req.url;

  const cloned = req.clone({
    url,
    ...(token ? { setHeaders: { Authorization: `Bearer ${token}` } } : {})
  });

  return next(cloned);
};
