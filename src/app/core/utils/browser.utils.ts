import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserUtils {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Safely access localStorage
   */
  getLocalStorage(key: string): string | null {
    if (this.isBrowser && typeof localStorage !== 'undefined') {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  setLocalStorage(key: string, value: string): void {
    if (this.isBrowser && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(key, value);
      } catch (error) {}
    }
  }

  removeLocalStorage(key: string): void {
    if (this.isBrowser && typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {}
    }
  }

  clearLocalStorage(): void {
    if (this.isBrowser && typeof localStorage !== 'undefined') {
      try {
        localStorage.clear();
      } catch (error) {}
    }
  }

  /**
   * Safely access sessionStorage
   */
  getSessionStorage(key: string): string | null {
    if (this.isBrowser && typeof sessionStorage !== 'undefined') {
      try {
        return sessionStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  setSessionStorage(key: string, value: string): void {
    if (this.isBrowser && typeof sessionStorage !== 'undefined') {
      try {
        sessionStorage.setItem(key, value);
      } catch (error) {}
    }
  }

  removeSessionStorage(key: string): void {
    if (this.isBrowser && typeof sessionStorage !== 'undefined') {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {}
    }
  }

  /**
   * Safely access window object
   */
  getWindow(): Window | null {
    if (this.isBrowser && typeof window !== 'undefined') {
      return window;
    }
    return null;
  }

  /**
   * Safely access document object
   */
  getDocument(): Document | null {
    if (this.isBrowser && typeof document !== 'undefined') {
      return document;
    }
    return null;
  }

  /**
   * Check if we're in a browser environment
   */
  isBrowserEnvironment(): boolean {
    return this.isBrowser;
  }

  /**
   * Safely create a download link
   */
  downloadFile(blob: Blob, filename: string): void {
    if (this.isBrowser && typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {}
    }
  }

  /**
   * Safely query DOM elements
   */
  querySelector(selector: string): Element | null {
    if (this.isBrowser && typeof document !== 'undefined') {
      try {
        return document.querySelector(selector);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  querySelectorAll(selector: string): NodeListOf<Element> | null {
    if (this.isBrowser && typeof document !== 'undefined') {
      try {
        return document.querySelectorAll(selector);
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}
