import { Route } from '@angular/router';
import { SetNewPasswordComponent } from './set-new-password.component';

export const setNewPasswordRoute: Route = {
  path: ':guid',
  component: SetNewPasswordComponent,
};
