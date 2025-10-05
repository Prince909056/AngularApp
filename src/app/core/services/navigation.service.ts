import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_ROUTES } from "../constants/api-routes.constant";
import { RoleManagementService } from "./role-management.service";
import { Role } from "../enums/role.enum";

@Injectable({
    providedIn: "root"
})
export class NavigationService {

    constructor(
        private router: Router,
        private roleManagementService: RoleManagementService
    ) { }

    // Helper function to get the appropriate default route based on user role
    private getDefaultRouteForRole(): string {
        const currentRole = this.roleManagementService.getCurrentActiveRole();

        if (currentRole) {
            switch (currentRole.id) {
                case Role.Staff:
                    return API_ROUTES.SESSIONS;
                case Role.Clinician:
                    return API_ROUTES.SESSIONS_CLINICIAN;
                case Role.Administrator:
                    return '/super-admin/dashboard';
                default: // PracticeAdmin, SuperAdmin, or other roles
                    return API_ROUTES.DASHBOARD;
            }
        }

        // Default fallback
        return API_ROUTES.DASHBOARD;
    }

    goToLogin(): void {
        this.router.navigate([API_ROUTES.LOGIN]);
    }

    goToSignUp(): void {
        this.router.navigate([API_ROUTES.SIGNUP]);
    }

    goToOnboarding(): void {
        this.router.navigate([API_ROUTES.ONBOARDING]);
    }

    goToVerification(): void {
        this.router.navigate([API_ROUTES.VERIFICATION])
    }

    goToRegister(): void {
        this.router.navigate([API_ROUTES.SIGNUP]);
    }

    goToForgotPassword() {
        this.router.navigate([API_ROUTES.FORGOT_PASSWORD]);
    }

    goToVerifyOtp() {
        this.router.navigate([API_ROUTES.VERIFY_OTP]);
    }

    goToResetPassword() {
        this.router.navigate([API_ROUTES.RESET_PASSWORD]);
    }

    goToDashboard(): void {
        const defaultRoute = this.getDefaultRouteForRole();
        this.router.navigate([defaultRoute]);
    }

    // New method for role-based navigation
    goToDefaultRoute(): void {
        const defaultRoute = this.getDefaultRouteForRole();
        this.router.navigate([defaultRoute]);
    }

    goToAnalytics(): void {
        this.router.navigate([API_ROUTES.ANALYTICS]);
    }

    goToInvoice(): void {
        this.router.navigate([API_ROUTES.INVOICE]);
    }

    goToSchedule(): void {
        this.router.navigate([API_ROUTES.TIME_SCHEDULE]);
    }

    goToCalendar(): void {
        this.router.navigate([API_ROUTES.CALENDER]);
    }

    goToMessages(): void {
        this.router.navigate([API_ROUTES.MESSAGES]);
    }

    goToNotification(): void {
        this.router.navigate([API_ROUTES.NOTIFICATION]);
    }

    goToSettings(): void {
        this.router.navigate([API_ROUTES.SETTINGS]);
    }

    goToTickets(): void {
        this.router.navigate([API_ROUTES.TICKETS]);
    }

    goToPracticeInfo(): void {
        this.router.navigate([API_ROUTES.PRACTICE_INFO]);
    }

    goToPracticeInfoAllOffice(): void {
        this.router.navigate([API_ROUTES.PRACTICEINFOALLOFFICES]);
    }
    goToTeamManagement(): void {
        this.router.navigate([API_ROUTES.TEAM_MANAGEMENT]);
    }

    goToDocuments(): void {
        this.router.navigate([API_ROUTES.DOCUMENTS]);
    }

    goToBillings() {
        this.router.navigate([API_ROUTES.BILLINGS]);
    }

    goToActivities(): void {
        this.router.navigate([API_ROUTES.ACTIVITES]);
    }

    goToAnnouncements(): void {
        this.router.navigate([API_ROUTES.ANNOUNCEMENTS]);
    }

    goToPrompt(): void {
        this.router.navigate([API_ROUTES.PROMPT]);
    }

    goToAiAssistant(): void {
        this.router.navigate(['ai-assistant']);
    }

    goToPatientPanelVerification(): void {
        this.router.navigate([API_ROUTES.PATIENT_PANEL_VERIFICATION]);
    }

    goToPatientVoiceAssistant(): void {
        this.router.navigate([API_ROUTES.PATIENT_VOICE_ASSISTANT]);
    }

    goToRules(): void {
        this.router.navigate(['set-rules']);
    }

    goToSetPassword(data: string) {
        this.router.navigate([API_ROUTES.SET_PASSWORD, data]);
    }

    goToSessionsClinician(): void {
        this.router.navigate([API_ROUTES.SESSIONS_CLINICIAN]);
    }

    goToTemplates(): void {
        this.router.navigate([API_ROUTES.TEMPLATES]);
    }

    goToSessionsStaff(): void {
        this.router.navigate([API_ROUTES.SESSIONS]);
    }

    goToPatient(data: string): void {
        this.router.navigate([API_ROUTES.PATIENT_PANEL, data]);
    }

    goToStaffPanelAnnouncements(): void {
        this.router.navigate(['staff-panel/announcements']);
    }
}