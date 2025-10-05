import { environment } from "../../../environments/environment";
 
export const API_ENDPOINTS = {
    V1: {
        LOGIN: {
            LOGIN: `${environment.server.baseUrl}api/v1/Login/GetTokenAsync`,
            SIGN_UP: `${environment.server.baseUrl}api/v1/Login/SignupMailAsync`,
            FORGOT_PASSWORD: `${environment.server.baseUrl}api/v1/Login/ForgotPasswordAsync`,
            SET_NEW_PASSWORD: `${environment.server.baseUrl}api/v1/Login/ResetPasswordForForgotAsync`,
            RESET_PASSWORD_FOR_FORGOT: `${environment.server.baseUrl}api/v1/Login/ResetPasswordForForgotAsync`,
            
        },
        OAuth: {
            SIGNUP_WITH_GOOGLE: `${environment.server.baseUrl}api/v1/OAuth/SignupGoogleAsync`,
            LOGIN_WITH_GOOGLE: `${environment.server.baseUrl}api/v1/OAuth/GetTokenGoogleAsync`,
            
        },
        DASHBOARD: {
            GET_STATS: `${environment.server.baseUrl}api/v1/Dashboard/GetDashboardStatsAsync`,
        }
    },
    V2: {  // For Example only
        LOGIN: {
            GET_TOKEN: `${environment.server.baseUrl}api/v2/Login/GetTokenAsync`,
        }
    }
}
