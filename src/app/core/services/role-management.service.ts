import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../enums/role.enum';

export interface UserRole {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoleManagementService {
  private currentActiveRoleSubject = new BehaviorSubject<UserRole | null>(null);
  private userRolesSubject = new BehaviorSubject<UserRole[]>([]);

  public currentActiveRole$ = this.currentActiveRoleSubject.asObservable();
  public userRoles$ = this.userRolesSubject.asObservable();

  private readonly ACTIVE_ROLE_KEY = 'activeRole';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Restore active role from localStorage if available
    const storedRole = this.getFromLocalStorage(this.ACTIVE_ROLE_KEY);
    if (storedRole) {
      try {
        const parsedRole = JSON.parse(storedRole);
        this.currentActiveRoleSubject.next(parsedRole);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }

  // Safe localStorage access utility
  private getFromLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setToLocalStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private removeFromLocalStorage(key: string): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  // Set user roles and determine initial active role
  setUserRoles(roles: UserRole[]): void {
    this.userRolesSubject.next(roles);
    // If user has multiple roles, try to restore from storage
    const storedRole = this.getFromLocalStorage(this.ACTIVE_ROLE_KEY);
    if (storedRole) {
      try {
        const parsedRole = JSON.parse(storedRole);
        const found = roles.find((r) => r.id === parsedRole.id);
        if (found) {
          this.setActiveRole(found);
          return;
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    // If user has multiple roles, default to SuperAdmin if available, then Administrator, then PracticeAdmin
    if (roles.length > 1) {
      const superAdminRole = roles.find((role) => role.id === Role.Administrator);
      if (superAdminRole) {
        this.setActiveRole(superAdminRole);
      } else {
        const administratorRole = roles.find((role) => role.id === Role.Administrator);
        if (administratorRole) {
          this.setActiveRole(administratorRole);
        } else {
          const practiceAdminRole = roles.find((role) => role.id === Role.StoreAdmin);
          if (practiceAdminRole) {
            this.setActiveRole(practiceAdminRole);
          } else {
            this.setActiveRole(roles[0]);
          }
        }
      }
    } else if (roles.length === 1) {
      // Single role user
      this.setActiveRole(roles[0]);
    } else {
      // No roles
      this.setActiveRole(null);
    }
  }

  // Set the currently active role
  setActiveRole(role: UserRole | null): void {
    this.currentActiveRoleSubject.next(role);
    if (role) {
      this.setToLocalStorage(this.ACTIVE_ROLE_KEY, JSON.stringify(role));
    } else {
      this.removeFromLocalStorage(this.ACTIVE_ROLE_KEY);
    }
  }

  // Get current active role
  getCurrentActiveRole(): UserRole | null {
    return this.currentActiveRoleSubject.value;
  }

  // Get all user roles
  getUserRoles(): UserRole[] {
    return this.userRolesSubject.value;
  }

  // Check if user has multiple roles
  hasMultipleRoles(): boolean {
    return this.userRolesSubject.value.length > 1;
  }

  // Check if user has a specific role
  hasRole(roleId: number): boolean {
    return this.userRolesSubject.value.some((role) => role.id === roleId);
  }

  // Get available roles for switching (only for users with multiple roles)
  getAvailableRolesForSwitching(): UserRole[] {
    const roles = this.userRolesSubject.value;
    if (roles.length <= 1) {
      return [];
    }
    return roles;
  }

  // Switch to a specific role
  switchToRole(roleId: number): boolean {
    const role = this.userRolesSubject.value.find((r) => r.id === roleId);
    if (role) {
      this.setActiveRole(role);
      this.setToLocalStorage(this.ACTIVE_ROLE_KEY, JSON.stringify(role));
      return true;
    }
    return false;
  }

  // Get role display name for the dropdown
  getRoleDisplayName(role: Role): string {
    switch (role) {
      case Role.Administrator:
        return 'Super Admin Dashboard';
      case Role.StoreAdmin:
        return 'Store Admin Dashboard';
      case Role.Staff:
        return 'Staff Dashboard';
      case Role.User:
        return 'User Dashboard';
      default:
        return role;
    }
  }
}
