import { BoltService } from './../../services/bolt.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Boards, StorageData } from '../../enums';
import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { IDeviceInstance, IBoards, IDevice } from '../../interface';
import { IDigitalParam } from 'bolt-iot-wrapper/dist/Interfaces';


@Component({
    templateUrl: 'boardRead.component.html',
    selector: 'board-read'
})
export class BoardReadComponent {
    public board: IBoards;
    public PINS = PINS;
    public device: IDevice;
    public pinsState = {
        [PINS.zero]: false,
        [PINS.one]: false,
        [PINS.two]: false,
        [PINS.three]: false,
        [PINS.four]: false
    }
    public isInitialzing = true;
    constructor(private route: ActivatedRoute, private storage: StorageService, private boltService: BoltService) {
        this.init();
    }


    async init() {
        this.board = this.storage.getData<IBoards[]>(StorageData.boards).find(r => r.id === this.route.snapshot.paramMap.get('boardId'))
        this.device = this.boltService.readDevice(this.board.boltProductName);
        const data = await this.device.
            instance.Digital.read([PINS.zero, PINS.one, PINS.two, PINS.three, PINS.four]) as IDigitalParam[]
        this.pinsState[PINS.zero] = !(data[0].state === STATE.high);
        this.pinsState[PINS.one] = !(data[1].state === STATE.high);
        this.pinsState[PINS.two] = !(data[2].state === STATE.high);
        this.pinsState[PINS.three] = !(data[3].state === STATE.high);
        this.pinsState[PINS.four] = !(data[4].state === STATE.high);
        this.isInitialzing = false;
    }

    async pinStateChanged(pin: PINS) {
        await this.device.instance.Digital.write({ pin, state: this.pinsState[pin] !== true ? STATE.high : STATE.low });
    }
}

