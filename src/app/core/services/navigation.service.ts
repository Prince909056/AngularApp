import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES } from '../constants/api-routes.constant';
import { Role } from '../enums/role.enum';
import { RoleManagementService } from './role-management.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private roleManagementService: RoleManagementService) {}

  // Helper function to get the appropriate default route based on user role
  private getDefaultRouteForRole(): string {
    const currentRole = this.roleManagementService.getCurrentActiveRole();

    if (currentRole) {
      switch (currentRole.id) {
        case Role.Administrator:
          return API_ROUTES.ADMINISTRATOR_DASHBOARD;
        case Role.StoreAdmin:
          return API_ROUTES.STOREADMIN_DASHBOARD;
        case Role.Staff:
          return API_ROUTES.STAFF_DASHBOARD;
        case Role.User:
          return API_ROUTES.USER_DASHBOARD;
        default:
          return API_ROUTES.DASHBOARD;
      }
    }

    return API_ROUTES.DASHBOARD;
  }

  goToLogin(): void {
    this.router.navigate([API_ROUTES.LOGIN]);
  }

  goToSignUp(): void {
    this.router.navigate([API_ROUTES.SIGNUP]);
  }

  goToForgotPassword() {
    this.router.navigate([API_ROUTES.FORGOT_PASSWORD]);
  }

  goToSetNewPassword(data: string) {
    this.router.navigate([API_ROUTES.SET_NEW_PASSWORD, data]);
  }

  goToResetPasswordForForgot() {
    this.router.navigate([API_ROUTES.RESET_PASSWORD]);
  }

  goToDashboard(): void {
    const defaultRoute = this.getDefaultRouteForRole();
    this.router.navigate([defaultRoute]);
  }
}
