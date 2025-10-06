import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';
import { type ITheme } from '../../../core/models/theme.model';

@Component({
  selector: 'app-theme-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent implements OnInit, OnDestroy {
  showModal = false;
  themes: ITheme[] = [];
  selectedTheme: ITheme | null = null;
  isLightMode = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.themes = this.themeService.getThemes();
    
    // Subscribe to theme changes
    this.subscriptions.add(
      this.themeService.selectedTheme$.subscribe(theme => {
        this.selectedTheme = theme;
      })
    );

    this.subscriptions.add(
      this.themeService.isLightMode$.subscribe(isLight => {
        this.isLightMode = isLight;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showModal = false;
  }

  selectTheme(theme: ITheme): void {
    this.themeService.selectTheme(theme);
  }

  setMode(isLight: boolean): void {
    this.themeService.setMode(isLight);
  }
}
