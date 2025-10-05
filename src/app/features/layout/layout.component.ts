import { Component, Input } from '@angular/core';
import { ThemeModalComponent } from '../../shared/components/theme-modal/theme-modal.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [ThemeModalComponent],
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
	@Input() title: string = 'Dashboard';
	currentYear: number = new Date().getFullYear();
}


