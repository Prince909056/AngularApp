import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { type IApiResponse } from '../../core/Models/api-response.model';
import { StorageService } from '../../core/services/storage.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { API_ROUTES } from '../constants/api-routes.constant';
import { MESSAGES } from '../constants/messages.constant';
// import { type ILoginRequest } from '../Models/login/request/login-request.model';
// import { type ILoginResponse } from '../Models/login/response/login-response.model';
// import { IGoogleSigninRequest } from '../Models/OAuth/Request/google-signin-request.model';
// import { ISignupPasswordResponse } from '../Models/OAuth/Response/google-signup-response.model';
// import { ISetPasswordRequest } from '../Models/set-password/set-password-request.model';
// import { SignupRequest } from '../Models/sign-up/sign-up.request.model';
import { HttpService } from './http.service';
import { NavigationService } from './navigation.service';
// import { ToastNotificationService } from './toast-notification.service';
import { IApiResponse } from '../models/api-response.model';
import { ILoginResponse } from '../models/login/response/login-response.model';
import { ToastNotificationService } from './toast-notification.service';
import { StorageKeysEnum } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isRefreshing = new BehaviorSubject<boolean>(false);
  refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private storageService: StorageService,
    private navigationService: NavigationService,
    private httpService: HttpService,
    private toastNotificationService: ToastNotificationService
  ) {}

  //   sendSignupMail(data: SignupRequest): Observable<IApiResponse<boolean>> {
  //     return this.httpService.post<boolean>(API_ENDPOINTS.V1.LOGIN.SIGN_UP, data);
  //   }

  //   setPassword(payload: ISetPasswordRequest) {
  //     return this.httpService.post<IApiResponse<any>>(
  //       API_ENDPOINTS.V1.LOGIN.SET_NEW_PASSWORD,
  //       payload
  //     ); // Adjust endpoint as needed
  //   }

  //   setNewPassword(payload: ISetPasswordRequest) {
  //     return this.httpService.post<IApiResponse<any>>(
  //       API_ENDPOINTS.V1.LOGIN.SET_NEW_PASSWORD,
  //       payload
  //     ); // Adjust endpoint as needed
  //   }

  //   login(credentials: ILoginRequest): Observable<IApiResponse<ILoginResponse>> {
  //     return this.httpService.post<ILoginResponse>(API_ENDPOINTS.V1.LOGIN.LOGIN, credentials, true);
  //   }

  logout(): void {
    // Preserve remember me data before clearing storage
    const rememberMeData = this.storageService.getItem(StorageKeysEnum.RememberMeData);

    // Clear all storage
    this.storageService.clear();

    // Restore remember me data if it exists
    if (rememberMeData) {
      this.storageService.setItem(StorageKeysEnum.RememberMeData, rememberMeData);
    }

    this.navigationService.goToLogin();
    this.toastNotificationService.info(MESSAGES.AUTH.LOGOUT_SUCCESS);
  }

  refreshToken(refreshToken: string): Observable<IApiResponse<ILoginResponse>> {
    return this.httpService.post<ILoginResponse>(
      API_ENDPOINTS.V1.LOGIN.REFRESH_TOKEN,
      { refreshToken },
      true
    );
  }

  resetRefreshToken() {
    this.isRefreshing.next(false);
    this.refreshTokenSubject.next(null);
  }

  //   signupWithGoogle(data: IGoogleSigninRequest): Observable<IApiResponse<ISignupPasswordResponse>> {
  //     return this.httpService.post<ISignupPasswordResponse>(
  //       API_ENDPOINTS.V1.OAuth.SIGNUP_WITH_GOOGLE,
  //       data,
  //       true
  //     );
  //   }

  //   loginWithGoogle(data: IGoogleSigninRequest): Observable<IApiResponse<ILoginResponse>> {
  //     return this.httpService.post<ILoginResponse>(
  //       API_ENDPOINTS.V1.OAuth.LOGIN_WITH_GOOGLE,
  //       data,
  //       true
  //     );
  //   }

  // signupBasicInfo(data: SignupBasicInfoRequest): Observable<IApiResponse<any>> {
  //     return this.httpService.post<any>(API_ENDPOINTS.V1.LOGIN.SIGNUP_BASIC_INFO, data);
  // }

  //   forgotPassword(email: string): Observable<IApiResponse<any>> {
  //     return this.httpService.post<any>(API_ENDPOINTS.V1.LOGIN.FORGOT_PASSWORD, { email });
  //   }
}
