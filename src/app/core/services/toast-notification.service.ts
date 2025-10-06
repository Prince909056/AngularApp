import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IError } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  duration: number = 3000; // 3s

  constructor(private ngToastService: NgToastService) {}

  success(
    message: string | IError,
    title?: string,
    duration?: number,
    showProgress?: boolean,
    dismissible?: boolean,
    showIcon?: boolean
  ) {
    if (typeof message === 'string') {
      this.ngToastService.success(message, title, duration ?? this.duration, showProgress, dismissible, showIcon);
    } else {
      this.ngToastService.success(message.message, message.code, duration ?? this.duration, showProgress, dismissible, showIcon);
    }
  }

  multiDanger(
    errors: IError[],
    title?: string,
    duration?: number,
    showProgress?: boolean,
    dismissible?: boolean,
    showIcon?: boolean
  ) {
    if (errors && errors.length > 0) {
      errors.forEach((x) => {
        this.ngToastService.danger(x.message, title, duration ?? this.duration, showProgress, dismissible, showIcon);
      });
    }
  }

  danger(
    message: IError,
    title?: string,
    duration?: number,
    showProgress?: boolean,
    dismissible?: boolean,
    showIcon?: boolean
  ) {
    this.ngToastService.danger(message.message, title, duration ?? this.duration, showProgress, dismissible, showIcon);
  }

  info(
    message: string,
    title?: string,
    duration?: number,
    showProgress?: boolean,
    dismissible?: boolean,
    showIcon?: boolean
  ) {
    this.ngToastService.info(message, title, duration ?? this.duration, showProgress, dismissible, showIcon);
  }

  warning(
    message: string,
    title?: string,
    duration?: number,
    showProgress?: boolean,
    dismissible?: boolean,
    showIcon?: boolean
  ) {
    this.ngToastService.warning(message, title, duration ?? this.duration, showProgress, dismissible, showIcon);
  }
}
