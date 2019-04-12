import { Boards } from './../enums';
import { StorageService } from './storage.service';
import { IDevice, IBoards } from './../interface.d';
import { Injectable } from '@angular/core';
import { StorageData } from '../enums';
import { Devices, PubSub } from 'bolt-iot-wrapper';
import { API_PHASE, LOG_TYPE, BOLT_FUNC } from 'bolt-iot-wrapper/dist/Enums';
import { LoadingController } from '@ionic/angular';
import { ToastService } from './toast.service';


@Injectable({
    providedIn: 'root'
})
export class BoltService {
    private deviceList: IDevice[] = [];
    private loading: HTMLIonLoadingElement;
    private loopEnabled = true;
    constructor(private storage: StorageService, public loadingController: LoadingController, private toastService: ToastService) {
        PubSub.api(this.apiState.bind(this));
        PubSub.message(this.boltMessage.bind(this));
    }

    async boltMessage(type: LOG_TYPE, msg: string) {
        this.toastService.error(msg);
    }

    apiState(phase: API_PHASE, boltFunction: BOLT_FUNC) {


        if (boltFunction === BOLT_FUNC.digitalMultiRead) {
            return;
        }
        let loader;
        switch (phase) {
            case API_PHASE.start:
                loader = this.loadingController.create({
                    message: 'Reading Device..',
                }).then(() => {
                    loader.present();
                });

                break;
            case API_PHASE.completed:
                this.loadingController.dismiss();
                break;
        }
    }

    async init() {
        const boards = this.storage.getData<IBoards[]>(StorageData.boards);
        boards.forEach(r => {
            const device = this.deviceList.find(j => j.productName === r.boltProductName);
            if (!device) {
                this.deviceList.push({
                    productName: r.boltProductName,
                    instance: Devices.add(r.boltProductName, r.apiKey)
                });
            }
        });

        this.loopEnabled = false;
        setTimeout(() => {
            this.initPolling(boards);
        }, 30000);

    }

    initPolling(boards: IBoards[]) {
        this.loopEnabled = true;
        boards.forEach((r) => {
            const loopPins = r.pins.filter(j => j.loopEnabled).map(k => k.number);
            const device = this.deviceList.find(j => j.productName === r.boltProductName);
            if (loopPins.length > 0) {
                device.instance.Digital.loopRead(loopPins, 5000, (data) => {
                    console.log(data)
                    return this.loopEnabled;
                });
            }

        });
    }

    addDevice(productName, apiKey) {
        this.deviceList.push({
            productName: productName,
            instance: Devices.add(productName, apiKey)
        });
    }

    readDevice(productName) {
        const device = this.deviceList.find(r => r.productName === productName);
        if (device) {
            return device;
        }
        throw new Error(`No device with name:${productName}`);
    }

}

