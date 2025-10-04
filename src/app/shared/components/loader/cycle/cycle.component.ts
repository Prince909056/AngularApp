import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { LoaderService } from "../../../services/loader.service";


@Component({
    selector: 'app-cycle-loader',
    imports: [CommonModule],
    templateUrl: './cycle.component.html',
    styleUrl: './cycle.component.scss'
})
export class CycleLoaderComponent implements OnInit {
    @Input({ required: true }) isLoading: boolean = false;
    constructor(private loaderService: LoaderService) {}
    ngOnInit(): void {
        this.loaderService.loader$.subscribe((state) => {
            this.isLoading = state;
        });
    }
}