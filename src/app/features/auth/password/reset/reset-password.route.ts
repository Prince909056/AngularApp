import { Route } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

export const resetPasswordRoute: Route = {
  path: ':guid',
  component: ResetPasswordComponent,
};