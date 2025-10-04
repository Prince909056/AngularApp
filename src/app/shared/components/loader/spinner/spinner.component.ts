import { Component, Input } from "@angular/core";
import { LoaderService } from "../../../services/loader.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-spinner',
    imports: [CommonModule],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss',
    standalone: true
})
export class SpinnerComponent {
    @Input({ required: true }) isLoading: boolean = false;
    constructor(private loaderService: LoaderService) {}
    ngOnInit(): void {
        this.loaderService.loader$.subscribe((state) => {
            this.isLoading = state;
        });
    }
}