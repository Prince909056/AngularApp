import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { type IApiResponse } from "../../core/Models/api-response.model";
import { StorageService } from "../../core/services/storage.service";
import { type ILoginRequest } from "../Models/login/request/login-request.model";
import { type ILoginResponse } from "../Models/login/response/login-response.model";
import { API_ENDPOINTS } from "../constants/api-endpoints.constant";
import { NavigationService } from "./navigation.service";
import { HttpService } from "./http.service";
import { ToastNotificationService } from "./toast-notification.service";
import { MESSAGES } from "../constants/messages.constant";
import { SignupRequest } from "../Models/sign-up/sign-up.request.model";
import { ISetPasswordRequest } from "../Models/set-password/set-password-request.model";
import { IGoogleSigninRequest } from "../Models/OAuth/Request/google-signin-request.model";
import { ISignupPasswordResponse } from "../Models/OAuth/Response/google-signup-response.model";
import { Router } from '@angular/router';
import { API_ROUTES } from '../constants/api-routes.constant';
import { SignupBasicInfoRequest } from "../Models/onboarding/signup-basic-info.request.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isRefreshing = new BehaviorSubject<boolean>(false);
    refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private storageService: StorageService,
        private navigationService: NavigationService,
        private httpService: HttpService,
        private toastNotificationService: ToastNotificationService,
        private router: Router
    ) { }

  sendSignupMail(data: SignupRequest): Observable<IApiResponse<boolean>> {
    return this.httpService.post<boolean>(API_ENDPOINTS.V1.LOGIN.SIGNUP, data);
  }

    setPassword(payload: ISetPasswordRequest) {
    return this.httpService.post<IApiResponse<any>>(API_ENDPOINTS.V1.LOGIN.SET_PASSWORD, payload);  // Adjust endpoint as needed
  }

      setNewPassword(payload: ISetPasswordRequest) {
    return this.httpService.post<IApiResponse<any>>(API_ENDPOINTS.V1.LOGIN.SET_NEW_PASSWORD, payload); // Adjust endpoint as needed
  }

    login(credentials: ILoginRequest): Observable<IApiResponse<ILoginResponse>> {
        return this.httpService.post<ILoginResponse>(API_ENDPOINTS.V1.LOGIN.GET_TOKEN, credentials, true);
    }

    logout(): void {
        // Preserve remember me data before clearing storage
        const rememberMeData = this.storageService.getItem('rememberMeData');

        // Clear all storage
        this.storageService.clear();

        // Restore remember me data if it exists
        if (rememberMeData) {
            this.storageService.setItem('rememberMeData', rememberMeData);
        }

        this.router.navigate([API_ROUTES.LOGIN]);
        this.toastNotificationService.info(MESSAGES.AUTH.LOGOUT_SUCCESS);
    }

    refreshToken(refreshToken: string): Observable<IApiResponse<ILoginResponse>> {
        return this.httpService.post<ILoginResponse>(API_ENDPOINTS.V1.LOGIN.REFRESH_TOKEN, { refreshToken }, true);
    }

    resetRefreshToken() {
        this.isRefreshing.next(false);
        this.refreshTokenSubject.next(null);
    }
    signupWithGoogle(data: IGoogleSigninRequest): Observable<IApiResponse<ISignupPasswordResponse>>  {
        return this.httpService.post<ISignupPasswordResponse>(API_ENDPOINTS.V1.OAuth.SIGNUP_WITH_GOOGLE, data, true);
    }

    loginWithGoogle(data: IGoogleSigninRequest): Observable<IApiResponse<ILoginResponse>>  {
        return this.httpService.post<ILoginResponse>(API_ENDPOINTS.V1.OAuth.LOGIN_WITH_GOOGLE, data, true);
    }

    signupBasicInfo(data: SignupBasicInfoRequest): Observable<IApiResponse<any>> {
        return this.httpService.post<any>(API_ENDPOINTS.V1.LOGIN.SIGNUP_BASIC_INFO, data);
    }

    forgotPassword(email: string): Observable<IApiResponse<any>> {
        return this.httpService.post<any>(API_ENDPOINTS.V1.LOGIN.FORGOT_PASSWORD, { email });
    }
}