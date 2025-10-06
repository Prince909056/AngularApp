import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { ILoginResponse } from "../Models/login/response/login-response.model";

@Injectable({
    providedIn: "root"
})
export class AuthTokenService {
    private readonly AUTH_DATA_KEY = 'authData';

    constructor(private storageService: StorageService) { }

    saveAuthToken(authData: ILoginResponse): void {
        try {
            this.storageService.setItem(this.AUTH_DATA_KEY, {
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                fullName: authData.fullName,
                email: authData.email,
                roles: authData.roles,
                practiceId: authData.practiceId,
                id: authData.id,
                profilePhotoUrl: authData.profilePhotoUrl
            });
        } catch (error) {
        }
    }

    getAuthToken(): ILoginResponse | null {
        try {
            return this.storageService.getItem<ILoginResponse>(this.AUTH_DATA_KEY);
        } catch (error) {
            return null;
        }
    }

    clearAuthToken(): void {
        try {
            this.storageService.removeItem(this.AUTH_DATA_KEY);
        } catch (error) {
        }
    }

    isAuthenticated(): boolean {
        try {
            const authData = this.getAuthToken();
            return !!authData?.accessToken;
        } catch (error) {
            return false;
        }
    }
}