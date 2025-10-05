import { Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeModalComponent } from '../../../shared/components/theme-modal/theme-modal.component';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  isLightMode = true;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeService: ThemeService
  ) {
    // Theme will be applied in ngAfterViewInit
  }

  ngAfterViewInit() {
    // Subscribe to theme changes
    this.subscriptions.add(
      this.themeService.isLightMode$.subscribe(isLight => {
        this.isLightMode = isLight;
      })
    );
    
    // Initialize theme immediately
    this.isLightMode = this.themeService.getIsLightMode();
    // this.loaderService.hide();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
