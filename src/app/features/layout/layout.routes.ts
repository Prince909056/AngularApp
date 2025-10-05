import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const layoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        // canActivate: [AuthGuard],

        children: [
            {
                path: '',
                // component: DashboardComponent,
            },
        ],
    }
];