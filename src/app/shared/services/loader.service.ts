import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private overlayRef: OverlayRef | null = null;
    public loader$ = new BehaviorSubject<boolean>(false);

    constructor(private overlay: Overlay) { }

    show(): void {
        this.loader$.next(true);
    }

    hide(): void {
        this.loader$.next(false);
    }

    showForModal(component: ComponentType<any>): void {
        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create({
                hasBackdrop: true,
                backdropClass: 'loader-backdrop',
                positionStrategy: this.overlay
                    .position()
                    .global()
                    .centerHorizontally()
                    .centerVertically(),
            });

            const loaderPortal = new ComponentPortal(component);
            this.overlayRef.attach(loaderPortal);
            this.loader$.next(true);
        }
    }

    hideForModal(): void {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.loader$.next(false);
        }
    }
}