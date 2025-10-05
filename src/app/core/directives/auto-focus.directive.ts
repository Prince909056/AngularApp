import { AfterViewInit, Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appAutoFocus]',
    standalone: true
})
export class AutoFocusDirective implements AfterViewInit {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }
    ngAfterViewInit(): void {
        this.renderer.selectRootElement(this.el.nativeElement).focus();
    }
}