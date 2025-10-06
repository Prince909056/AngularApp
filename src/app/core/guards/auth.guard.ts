import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { API_ROUTES } from "../constants/api-routes.constant";
import { StorageService } from "../services/storage.service";
import { AuthTokenService } from "../services/auth-token.service";
import { ToastNotificationService } from "../services/toast-notification.service";

export const authGuard: CanActivateFn = (route, state) => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    const authTokenService = inject(AuthTokenService);
    const storageService = inject(StorageService);
    const toastNotificationService = inject(ToastNotificationService);

    if (isPlatformBrowser(platformId)) {
        try {
            // Use the AuthTokenService to check authentication status
            const authToken = authTokenService.getAuthToken();

            // If no auth token or access token, redirect to login
            if (!authToken || !authToken.accessToken) {
                // Check if we're already on the login page to avoid redirect loops
                if (state.url.includes(API_ROUTES.LOGIN) || state.url.includes('/auth')) {
                    return true;
                }

                // Only redirect if we're not already on a public route
                if (!state.url.includes('/auth') && !state.url.includes('/public')) {
                    // Store the intended URL to redirect after login
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('intendedUrl', state.url);
                    }
                    router.navigate([API_ROUTES.LOGIN]);
                    return false;
                }
                return true;
            }

            // const practiceId = authToken.practiceId;
            // const roles = authToken.roles;
            // const isPracticeAdmin = roles?.some(role => role.name === 'PracticeAdmin');
            // const isStaff = roles?.some(role => role.name === 'Staff');
            // const isClinician = roles?.some(role => role.name === 'Clinician');
            // const signUpId = storageService.getItem('signUpId');

            // // If practiceId is 0, allow access (for onboarding users)
            // if (practiceId === 0) {
            //     return true;
            // }

            // // If practiceId > 0, allow access (for users with assigned practice)
            // if (practiceId !== null && practiceId !== undefined && practiceId > 0) {
            //     return true;
            // }

            // // If practiceId is null or undefined, check user roles
            // // Staff and Clinician users should be allowed access even without practiceId
            // if (practiceId === null || practiceId === undefined) {
            //     if (isStaff || isClinician || isPracticeAdmin) {
            //         return true;
            //     }
            // }

            // If we reach here, the user doesn't have proper permissions
            // Only redirect to login if not already on login page
            if (!state.url.includes(API_ROUTES.LOGIN)) {
                router.navigate([API_ROUTES.LOGIN]);
                return false;
            }

            return true;
        } catch (error) {
            // Error occurred during authentication check
            // In case of error, redirect to login
            if (!state.url.includes(API_ROUTES.LOGIN)) {
                router.navigate([API_ROUTES.LOGIN]);
                return false;
            }
            return true;
        }
    }

    return true;
};
