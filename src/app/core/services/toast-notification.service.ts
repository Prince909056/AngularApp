import { Injectable } from "@angular/core";
// import { MessageService } from "primeng/api";
import { NgToastService } from 'ng-angular-popup';
import { IError } from "../Models/error.model";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: "root"
})
export class ToastNotificationService {
    duration: number = 3000; // 3s
    // constructor(private messageService: MessageService) { }

    // showToastNotification(errors?: IError[], severity: string = "error", life: number = 2000, message: string = ""): void {

    //     if (severity === "error") {
    //         if (!errors || errors.length === 0) return;

    //         errors.forEach(error => {
    //             this.messageService.add({
    //                 severity: severity,
    //                 summary: error.code,
    //                 detail: error.message,
    //                 life: life
    //             });
    //         });
    //     } else {
    //         this.messageService.add({
    //             severity: severity,
    //             summary: message,
    //             // detail: message,
    //             life: life
    //         });
    //     }
    // }

    constructor(private ngToastService: NgToastService) { }

    success(message: string | IError, title?: string, duration?: number) {
        if (typeof message === 'string') {
            this.ngToastService.success(message, title, duration ?? this.duration);
        } else {
            this.ngToastService.success(message.message, message.code, duration ?? this.duration);
        }
    }

    multiDanger(errors: IError[], istitle: boolean = false, title?: string, duration?: number) {
        if (errors && errors.length > 0) {
            // Use SweetAlert2 for error messages
            const errorMessages = errors.map(err => err.message).join('\n');
            return Swal.fire({
                icon: 'error',
                title: title || 'Error',
                text: errorMessages,
                confirmButtonText: 'Close',
                confirmButtonColor: '#3b31ef',
            });
        }
        return Promise.resolve();
    }

    danger(message: string | IError, istitle: boolean = false, title?: string, duration?: number) {
        if (typeof message === 'string') {
            // Use SweetAlert2 for error messages
            return Swal.fire({
                icon: 'error',
                title: title || 'Error',
                text: message,
                confirmButtonText: 'Close',
                confirmButtonColor: '#3b31ef',
            });
        } else {
            // Use SweetAlert2 for error messages
            return Swal.fire({
                icon: 'error',
                title: title || message.code || 'Error',
                text: message.message,
                confirmButtonText: 'Close',
                confirmButtonColor: '#3b31ef',
            });
        }
    }

    info(message: string, title?: string, duration?: number) {
        this.ngToastService.info(message, title, duration ?? this.duration);
    }

    warning(message: string, title?: string, duration?: number) {
        this.ngToastService.warning(message, title, duration ?? this.duration);
    }
}