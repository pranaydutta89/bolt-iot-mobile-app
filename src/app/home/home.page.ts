import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DeviceService } from '../services/device.service';
import { Products, StorageData } from '../enums';
import { IProductStatus } from '../interface';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public motionSensorDisabled = true;
  public productStatus: IProductStatus = this.Storage.getData<IProductStatus>(StorageData.productStatus);
  constructor(private Device: DeviceService, private Storage: StorageService, public toastController: ToastController) {

    this.checkStatus();
    this.Device.MotionSensorStatus = this.productStatus[Products.motionSensor];
  }

  async checkStatus() {
    if (await this.Device.isMotionSensorOnline()) {
      this.motionSensorDisabled = false;
    }
  }

  async motionChanged() {
    if (await this.Device.isMotionSensorOnline()) {
      this.Storage.setData(StorageData.productStatus, this.productStatus);
      this.Device.MotionSensorStatus = this.productStatus[Products.motionSensor];
    }
  }



}
