import { BoltService } from './../../services/bolt.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageData, PinType, Messages } from '../../enums';
import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { IDeviceInstance, IBoard, IPin } from '../../interface';
import { IDigitalReturn } from 'bolt-iot-wrapper/dist/Interfaces';
import { ToastService } from 'src/app/services/toast.service';


@Component({
    templateUrl: 'boardRead.component.html',
    selector: 'board-read'
})
export class BoardReadComponent {
    public board: IBoard;
    public boardId: string = this.route.snapshot.paramMap.get('boardId');
    public PINS = PINS;
    public STATE = STATE;
    public pinType = PinType;
    public device: IDeviceInstance;
    constructor(private route: ActivatedRoute, private toastService: ToastService,
        private storage: StorageService, private boltService: BoltService) {
        this.init();
    }


    async init() {
        this.board = this.storage.getData<IBoard[]>(StorageData.boards).
            find(r => r.id === this.boardId);
        this.device = this.boltService.readDevice(this.board.boltProductName);
        for (const pin of this.board.pins) {
            if (pin.type === PinType.digitalRead) {
                await this.readPinState(pin);
            }
        }
    }

    async pinStateChanged(pin: PINS, state) {
        await this.device.Digital.write({ pin, state });
        this.toastService.success(Messages.success);
    }

    async readPinState(pin: IPin) {
        const res = await this.device.Digital.read(pin.number) as IDigitalReturn;
        pin.readState = res.state;
        this.toastService.success(Messages.success);
    }
}

