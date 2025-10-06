import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { type ITheme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: ITheme[] = [
    {
      name: 'Ocean Blue',
      description: 'Trust & Reliability',
      primary: '#2563EB',
      accent: '#3B82F6',
      backgroundLight: '#F8FAFC',
      backgroundDark: '#0F172A',
      textLight: '#1E293B',
      textDark: '#F8FAFC',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)'
    },
    {
      name: 'Royal Purple',
      description: 'Elegance & Sophistication',
      primary: '#7C3AED',
      accent: '#A78BFA',
      backgroundLight: '#FAF8FF',
      backgroundDark: '#1E1630',
      textLight: '#2E1065',
      textDark: '#F3E8FF',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)'
    },
    {
      name: 'Emerald Green',
      description: 'Freshness & Growth',
      primary: '#059669',
      accent: '#34D399',
      backgroundLight: '#F0FDF4',
      backgroundDark: '#0C1F18',
      textLight: '#064E3B',
      textDark: '#ECFDF5',
      gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)'
    },
    {
      name: 'Sunset Orange',
      description: 'Energy & Vitality',
      primary: '#EA580C',
      accent: '#FB923C',
      backgroundLight: '#FFF7ED',
      backgroundDark: '#1F0E06',
      textLight: '#7C2D12',
      textDark: '#FFF7ED',
      gradient: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)'
    }
  ];

  private selectedThemeSubject = new BehaviorSubject<ITheme>(this.themes[3]); // Default to Sunset Orange
  private isLightModeSubject = new BehaviorSubject<boolean>(true);

  public selectedTheme$ = this.selectedThemeSubject.asObservable();
  public isLightMode$ = this.isLightModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadThemeFromStorage();
  }

  getThemes(): ITheme[] {
    return this.themes;
  }

  getSelectedTheme(): ITheme {
    return this.selectedThemeSubject.value;
  }

  getIsLightMode(): boolean {
    return this.isLightModeSubject.value;
  }

  selectTheme(theme: ITheme): void {
    this.selectedThemeSubject.next(theme);
    this.applyTheme();
    this.saveThemeToStorage();
  }

  setMode(isLight: boolean): void {
    this.isLightModeSubject.next(isLight);
    this.applyTheme();
    this.saveThemeToStorage();
  }

  private applyTheme(): void {
    // Only apply theme in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const root = document.documentElement;
    const theme = this.selectedThemeSubject.value;
    const isLightMode = this.isLightModeSubject.value;
    
    // Add or remove dark-mode class to document body
    if (isLightMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
    
    // Set theme gradient - always use the theme gradient for buttons and interactive elements
    root.style.setProperty('--theme-gradient', theme.gradient);
    
    // Set background gradient separately for the page background
    if (isLightMode) {
      root.style.setProperty('--page-background', theme.gradient);
      document.body.style.background = theme.gradient;
    } else {
      // For dark mode, use the dark background color for page background
      root.style.setProperty('--page-background', theme.backgroundDark);
      document.body.style.background = theme.backgroundDark;
    }
    
    // Convert hex to RGB for rgba values
    const primaryRgb = this.hexToRgb(theme.primary);
    const accentRgb = this.hexToRgb(theme.accent);
    
    // Set primary color variations
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-primary-rgba', `rgba(${primaryRgb}, 0.15)`);
    root.style.setProperty('--theme-primary-rgba-hover', `rgba(${primaryRgb}, 0.25)`);
    root.style.setProperty('--theme-primary-shadow', `0 4px 15px rgba(${primaryRgb}, 0.1)`);
    root.style.setProperty('--theme-primary-shadow-hover', `0 6px 20px rgba(${primaryRgb}, 0.2)`);
    root.style.setProperty('--theme-primary-shadow-button', `0 10px 25px rgba(${primaryRgb}, 0.3)`);
    
    if (isLightMode) {
      root.style.setProperty('--theme-background', theme.backgroundLight);
      root.style.setProperty('--theme-text', theme.textLight);
    } else {
      root.style.setProperty('--theme-background', theme.backgroundDark);
      root.style.setProperty('--theme-text', theme.textDark);
    }
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '255, 107, 53';
  }

  private loadThemeFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const savedTheme = localStorage.getItem('selectedTheme');
      const savedMode = localStorage.getItem('isLightMode');

      if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        this.selectedThemeSubject.next(theme);
      }

      if (savedMode !== null) {
        this.isLightModeSubject.next(savedMode === 'true');
      }

      this.applyTheme();
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
  }

  private saveThemeToStorage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem('selectedTheme', JSON.stringify(this.selectedThemeSubject.value));
      localStorage.setItem('isLightMode', this.isLightModeSubject.value.toString());
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  }
}
