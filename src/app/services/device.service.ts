import { Injectable } from '@angular/core';
import { Devices, Enums } from 'bolt-iot-wrapper';
import { IDevice, IProductData } from '../interface';
import { Products, StorageData } from '../enums';
import { ToastController } from '@ionic/angular';
import { IDigitalParam } from 'bolt-iot-wrapper/dist/Interfaces';
import { StorageService } from './storage.service';
import { NotificationsService } from './notifications.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    private deviceList: IDevice[] = [];
    private motionSensorStatus = false;
    constructor(public toastController: ToastController,
        private Storage: StorageService, private notificationSerivce: NotificationsService) {
    }

    init() {
        return new Promise((res, rej) => {
            this.deviceList.push({
                key: Products.motionSensor,
                instance: Devices.add('BOLT3429641', '14c7a1f3-e3d0-4db3-bd56-472783a3770e')
            });
            res();
        });
    }

    product(productName: Products) {
        const product = this.deviceList.find(r => r.key === productName);
        if (product) {
            return product.instance;
        }
        throw new Error('Invalid Product');
    }

    public set MotionSensorStatus(val: boolean) {
        this.motionSensorStatus = val;
        if (val === true) {
            this.pollMotionSensor();
        }
    }
    public get MotionSensorStatus() {
        return this.motionSensorStatus;
    }

    private async  pollMotionSensor() {
        const cb = (data: IDigitalParam) => {
            const products = this.Storage.getData<IProductData>(StorageData.productData);
            products[Products.motionSensor].push({
                state: data.state,
                timestamp: Date.now()
            });
            if (data.state === Enums.STATE.high) {
                this.notificationSerivce.show('Intrution Detected');
            }
            this.Storage.setData(StorageData.productData, products);
            return this.motionSensorStatus;
        };
        await this.product(Products.motionSensor).Digital.loopRead(Enums.PINS.one, 3200, cb);
    }

    async isMotionSensorOnline() {
        if (!await this.product(Products.motionSensor).Utility.isOnline()) {
            const toast = await this.toastController.create({
                message: 'Motion sensor offline.',
                duration: 2000
            });
            toast.present();
            return false;
        }

        return true;
    }

}
