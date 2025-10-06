import { Injectable } from '@angular/core';
import { StorageKeysEnum } from '../enums/storage-keys.enum';
import { ILoginResponse } from '../models/login/response/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && !!window.localStorage;
  }

  setItem(key: string, value: any): void {
    if (this.isBrowser && window.localStorage) {
      try {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
      } catch (error) {}
    }
  }

  updateTokens(token: string, refreshToken: string): void {
    const authData = this.getItem<ILoginResponse>(StorageKeysEnum.AuthData);
    if (authData) {
      authData.accessToken = token;
      authData.refreshToken = refreshToken;
      this.setItem(StorageKeysEnum.AuthData, authData);
    }
  }

  getItem<T>(key: string = 'authData'): T | null {
    if (this.isBrowser && window.localStorage) {
      try {
        const data = localStorage.getItem(key);
        return data ? (JSON.parse(data) as T) : null;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser && window.localStorage) {
      try {
        localStorage.removeItem(key);
      } catch (error) {}
    }
  }

  clear(): void {
    if (this.isBrowser && window.localStorage) {
      try {
        localStorage.clear();
      } catch (error) {}
    }
  }
}
