import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { ILoginResponse } from "../Models/login/response/login-response.model";
import { AuthTokenService } from "../services/authToken.service";
import { NavigationService } from "../services/navigation.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const localStorageService = inject(StorageService);
    const authTokenService = inject(AuthTokenService);
    const navigationService = inject(NavigationService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // Skip auth-related handling for 500 errors
            if (error.status === 500) {
                return throwError(() => error);
            }

            // Handle authentication errors
            if (error.status === 401) {
                // Skip handling for certain routes that don't require authentication
                const skipAuthRoutes = ['/login', '/signup', '/forgot-password', '/verification', '/onboarding'];
                const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
                const shouldSkipAuth = skipAuthRoutes.some(route => currentUrl.includes(route));

                if (shouldSkipAuth) {
                    return throwError(() => error);
                }

                // Check if this is a refresh token request
                if (req.url.includes('RefreshTokenAsync')) {

                    handleLogout(authTokenService, navigationService);
                    return throwError(() => error);
                }
                return handle401Error(req, next, authService, localStorageService, authTokenService, navigationService);
            }

            // Handle other errors
            return throwError(() => error);
        })
    );

    function handle401Error(
        req: HttpRequest<any>, 
        next: HttpHandlerFn, 
        authService: AuthService, 
        localStorageService: StorageService,
        authTokenService: AuthTokenService,
        navigationService: NavigationService
    ): Observable<HttpEvent<any>> {

        if (!authService.isRefreshing.value) {
            authService.isRefreshing.next(true);
            authService.refreshTokenSubject.next(null);

            const refreshToken = localStorageService.getItem<ILoginResponse>('authData')?.refreshToken;

            if (!refreshToken) {
                authService.isRefreshing.next(false);
                handleLogout(authTokenService, navigationService);
                return throwError(() => new Error('No refresh token found'));
            }

            return authService.refreshToken(refreshToken).pipe(
                catchError((error) => {

                    authService.isRefreshing.next(false);
                    handleLogout(authTokenService, navigationService);
                    return throwError(() => error);
                }),
                switchMap((response) => {

                    if (response?.isSuccess && response?.data) {
                        // Save the new tokens and user data
                        authTokenService.saveAuthToken(response.data);

                        authService.isRefreshing.next(false);
                        authService.refreshTokenSubject.next(response.data.accessToken);

                        return next(addToken(req, response.data.accessToken));
                    } else {

                        authService.isRefreshing.next(false);
                        handleLogout(authTokenService, navigationService);
                        throw new Error('Invalid refresh token response');
                    }
                })
            );
        } else {
            return authService.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => next(addToken(req, token!))),
                catchError((error) => {

                    handleLogout(authTokenService, navigationService);
                    return throwError(() => error);
                })
            );
        }
    }

    function handleLogout(authTokenService: AuthTokenService, navigationService: NavigationService): void {
        // Preserve remember me data before clearing storage
        const rememberMeData = localStorageService.getItem('rememberMeData');

        authTokenService.clearAuthToken();
        localStorageService.clear();

        // Restore remember me data if it exists
        if (rememberMeData) {
            localStorageService.setItem('rememberMeData', rememberMeData);
        }

        navigationService.goToLogin();
    }

    function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }
};
