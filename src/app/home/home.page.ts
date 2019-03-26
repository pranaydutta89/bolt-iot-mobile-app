import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DeviceService } from '../services/device.service';
import { Products } from '../enums';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private motionSensorDisabled = true;
  constructor(private DeviceServ: DeviceService) {

    this.checkStatus();
  }

  async checkStatus() {
    if (!await this.DeviceServ.product(Products.motionSensor).Utility.isOnline()) {
      this.motionSensorDisabled = false;
    }
  }

}
