import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const storageService = inject(StorageService);
//   const authService = inject(AuthService);
  const authTokenService = inject(AuthTokenService);
  const navigationService = inject(NavigationService);

  // Skip adding token for refresh token requests
  if (req.url.includes('RefreshTokenAsync')) {
    return next(req);
  }

  // Add token to request if available
  const token = storageService.getItem<ILoginResponse>('authData')?.accessToken;
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const refreshToken = storageService.getItem<ILoginResponse>('authData')?.refreshToken;

        if (!refreshToken) {
          handleLogout(authTokenService, navigationService, storageService);
          return throwError(() => error);
        }

        return authService.refreshToken(refreshToken).pipe(
          switchMap((response) => {
            if (response.isSuccess) {
              // Store the new tokens
              authTokenService.saveAuthToken(response.data);

              // Retry the failed request with new token
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.data.accessToken}`,
                },
              });

              return next(newRequest);
            } else {
              handleLogout(authTokenService, navigationService, storageService);
              return throwError(() => error);
            }
          }),
          catchError((refreshError) => {
            handleLogout(authTokenService, navigationService, storageService);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

function handleLogout(
  authTokenService: AuthTokenService,
  navigationService: NavigationService,
  storageService: StorageService
): void {
  // Preserve remember me data before clearing storage
  const rememberMeData = storageService.getItem('rememberMeData');

  authTokenService.clearAuthToken();
  storageService.clear();

  // Restore remember me data if it exists
  if (rememberMeData) {
    storageService.setItem('rememberMeData', rememberMeData);
  }

  navigationService.goToLogin();
}
