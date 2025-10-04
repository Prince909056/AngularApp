import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Theme {
  name: string;
  description: string;
  primary: string;
  accent: string;
  backgroundLight: string;
  backgroundDark: string;
  textLight: string;
  textDark: string;
  gradient: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showThemeModal = false;
  isLightMode = true;
  
  themes: Theme[] = [
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

  selectedTheme = this.themes[0]; // Default to Ocean Blue

  openThemeModal() {
    this.showThemeModal = true;
  }

  closeThemeModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showThemeModal = false;
  }

  selectTheme(theme: Theme) {
    this.selectedTheme = theme;
    this.applyTheme();
  }

  setMode(isLight: boolean) {
    this.isLightMode = isLight;
    this.applyTheme();
  }

  private applyTheme() {
    const root = document.documentElement;
    const theme = this.selectedTheme;
    
    if (this.isLightMode) {
      root.style.setProperty('--theme-primary', theme.primary);
      root.style.setProperty('--theme-accent', theme.accent);
      root.style.setProperty('--theme-background', theme.backgroundLight);
      root.style.setProperty('--theme-text', theme.textLight);
    } else {
      root.style.setProperty('--theme-primary', theme.primary);
      root.style.setProperty('--theme-accent', theme.accent);
      root.style.setProperty('--theme-background', theme.backgroundDark);
      root.style.setProperty('--theme-text', theme.textDark);
    }
  }

  // toggleDarkMode() {
  //   this.isLightMode = !this.isLightMode;
  //   this.applyTheme();
  // }
}
