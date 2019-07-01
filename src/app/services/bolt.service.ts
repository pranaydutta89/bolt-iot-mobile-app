import { StorageService } from './storage.service';
import { IDevice, IBoard, IPin } from '../interface';
import { Injectable } from '@angular/core';
import { StorageData } from '../enums';
import { Devices, PubSub } from 'bolt-iot-wrapper';
import { API_PHASE, LOG_TYPE, BOLT_FUNC, API_STATUS, PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { LoadingController } from '@ionic/angular';
import { ToastService } from './toast.service';
import { NotificationsService } from './notifications.service';
import { IDigitalReturn } from 'bolt-iot-wrapper/dist/Interfaces';


@Injectable({
    providedIn: 'root'
})
export class BoltService {
    private loading: HTMLIonLoadingElement;
    private loaderPresented = false;
    public doShowLoader = true;

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

        if (this.doShowLoader) {
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
                    await this.loading.dismiss();
                    this.loaderPresented = false;
                    break;
            }
        }
    }

    public async init() {
        const boards = this.storage.getData<IBoard[]>(StorageData.boards);
        if (boards) {
            boards.forEach(r => {
                if (!Devices.isDeviceAdded(r.boltProductName)) {
                    Devices.add(r.boltProductName, r.apiKey);
                }
            });
        }
    }

    public async pwm(board: IBoard, pin: IPin) {
        return await Devices.addAndRead(board.boltProductName, board.apiKey).Analog.pwm({
            pin: pin.number,
            value: pin.value as number
        });
    }

    public async digitalWrite(board: IBoard, pin: IPin) {
        return await Devices.addAndRead(board.boltProductName, board.apiKey).Digital.write({
            pin: pin.number,
            state: pin.value as STATE
        });
    }

    public async digitalRead(board: IBoard, pin: IPin) {
        return await Devices.addAndRead(board.boltProductName, board.apiKey).
            Digital.read(pin.number) as IDigitalReturn;
    }
}

