import { Boards, LoopAction } from './../enums';
import { StorageService } from './storage.service';
import { IDevice, IBoards, IPin } from '../interface';
import { Injectable } from '@angular/core';
import { StorageData } from '../enums';
import { Devices, PubSub } from 'bolt-iot-wrapper';
import { API_PHASE, LOG_TYPE, BOLT_FUNC, API_STATUS, PINS } from 'bolt-iot-wrapper/dist/Enums';
import { LoadingController } from '@ionic/angular';
import { ToastService } from './toast.service';
import { IDigitalReturn } from 'bolt-iot-wrapper/dist/Interfaces';
import { NotificationsService } from './notifications.service';


@Injectable({
    providedIn: 'root'
})
export class BoltService {
    private loading: HTMLIonLoadingElement;
    private loaderPresented = false;
    private loopEnabled = true;
    constructor(private storage: StorageService, private notificationService: NotificationsService,
        private loadingController: LoadingController, private toastService: ToastService) {
        PubSub.api(this.apiState.bind(this));
        PubSub.message(this.boltMessage.bind(this));
    }

    private setTimeoutAsync(time: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                // tslint:disable-next-line: align
            }, time);
        });
    }

    private async boltMessage(type: LOG_TYPE, msg: string) {
        this.toastService.error(msg);
    }

    private async apiState(phase: API_PHASE, boltFunction: BOLT_FUNC) {


        switch (phase) {
            case API_PHASE.start:
                if (!this.loaderPresented) {
                    this.loading = await this.loadingController.create({
                        message: 'Reading Device..',
                    });
                    await this.loading.present();
                }
                this.loaderPresented = true;
                break;
            case API_PHASE.completed:
                while (!this.loaderPresented) {
                    await this.setTimeoutAsync(10);
                }
                await this.setTimeoutAsync(3000);
                await this.loading.dismiss();
                this.loaderPresented = false;
                break;
        }
    }

    public async init() {
        const boards = this.storage.getData<IBoards[]>(StorageData.boards);
        boards.forEach(r => {
            if (!Devices.isDeviceAdded(r.boltProductName)) {
                Devices.add(r.boltProductName, r.apiKey);
            }
        });
    }

    addDevice(productName, apiKey) {
        Devices.add(productName, apiKey);
    }

    readDevice(productName) {
        return Devices.read(productName);
    }

}

