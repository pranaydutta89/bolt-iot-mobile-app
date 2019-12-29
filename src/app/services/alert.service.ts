import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export default class AlertService {
  constructor(public alertController: AlertController) {}
  confirmDialog(message: string) {
    return new Promise(async (res, rej) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: message,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: rej
          },
          {
            text: 'Yes',
            handler: res
          }
        ]
      });

      await alert.present();
    });
  }
}
