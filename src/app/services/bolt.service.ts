import { Boards, LoopAction } from './../enums';
import { StorageService } from './storage.service';
import { IDevice, IBoards, IPin } from './../interface.d';
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

        this.loopEnabled = false;
        setTimeout(() => {
            this.initPolling(boards);
        }, 20000);

    }

    private decision(boardId: string, pins: PINS[], data: IDigitalReturn[]) {
        const boards = this.storage.getData<IBoards[]>(StorageData.boards);
        const currentBoard = boards.find(k => k.id === boardId);
        pins.forEach(j => {
            if (data.find(l => l.pin === j).state === currentBoard.pins[j].triggerOn) {
                const loopAction = currentBoard.pins[j].loopAction;
                switch (loopAction) {
                    case LoopAction.store:
                        this.storeData(currentBoard, currentBoard.pins[j], data);
                        break;
                    case LoopAction.notification:
                        this.notifyPollResult(currentBoard.name, currentBoard.pins[j].name);
                        break;
                    case LoopAction.storeAndNotification:
                        this.storeData(currentBoard, currentBoard.pins[j], data);
                        this.notifyPollResult(currentBoard.name, currentBoard.pins[j].name);
                        break;
                }
            }

        });
    }

    private storeData(boards: IBoards, pin: IPin, data: IDigitalReturn[]) {
        const board = this.storage.getData<IBoards[]>(StorageData.boards);
        const currentBoard = board.find(k => k.id === boards.id);
        const storeData = currentBoard.pins[pin.number].storeData;
        if (storeData) {
            storeData.push({
                timeStamp: Date.now(),
                state: data.find(l => l.pin === pin.number).state
            });
        } else {
            pin.storeData = [{
                timeStamp: Date.now(),
                state: data.find(l => l.pin === pin.number).state
            }];
        }
        this.storage.setData(StorageData.boards, board);
    }

    private notifyPollResult(boardName: string, pinName: string) {
        this.notificationService.show(`${boardName} board trigger poll for pin ${pinName}`);
    }

    private initPolling(boards: IBoards[]) {
        this.loopEnabled = true;
        boards.forEach((r) => {
            const loopPins = r.pins.filter(j => j.loopEnabled).map(k => k.number);
            const device = Devices.read(r.boltProductName);
            if (loopPins.length > 0) {
                device.Digital.loopRead(loopPins, 20000, (apiStatus: API_STATUS, data: IDigitalReturn[]) => {
                    if (apiStatus === API_STATUS.success) {
                        this.decision(r.id, loopPins, data);
                    }
                    return this.loopEnabled;
                });
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

