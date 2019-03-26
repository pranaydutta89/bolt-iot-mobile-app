import { Injectable } from '@angular/core';
import { Devices, Enums } from 'bolt-iot-wrapper';
import { IDevice } from '../interface';
import { Products } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    private deviceList: IDevice[] = [];
    constructor() {
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


}
