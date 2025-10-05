import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [LayoutComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    // For now the dashboard is static markup that mirrors the provided design.
}
