import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./shared/components/loader/spinner/spinner.component";
import { Subject } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('AngularApp');
  private destroy$ = new Subject<void>();
  isLoading = false;

  /**
   *
   */
  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {
    // super();
    // this.isLoading = true;
  }

  ngOnInit(): void {
    this.loaderService.loader$.subscribe((state) => {
      this.isLoading = state;
      // Manually trigger change detection
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
