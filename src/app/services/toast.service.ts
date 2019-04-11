import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';



@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(public toastController: ToastController) {

    }

    async info(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: 'primary'
        });
        toast.present();
    }

    async error(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: 'danger'
        });
        toast.present();
    }
}