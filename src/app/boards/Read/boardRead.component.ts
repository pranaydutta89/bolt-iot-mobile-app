import { BoltService } from './../../services/bolt.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Boards, StorageData } from '../../enums';
import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { IDeviceInstance, IBoards, IDevice, IPin, IPinState } from '../../interface';
import { IDigitalParam } from 'bolt-iot-wrapper/dist/Interfaces';
import { Statement } from '@angular/compiler';


@Component({
    templateUrl: 'boardRead.component.html',
    selector: 'board-read'
})
export class BoardReadComponent {
    public board: IBoards;
    public boardId: string = this.route.snapshot.paramMap.get('boardId');
    public PINS = PINS;
    public STATE = STATE;
    public device: IDeviceInstance;
    constructor(private route: ActivatedRoute, private storage: StorageService, private boltService: BoltService) {
        this.init();
    }


    async init() {
        this.board = this.storage.getData<IBoards[]>(StorageData.boards).
            find(r => r.id === this.boardId);
        this.device = this.boltService.readDevice(this.board.boltProductName);
    }

    async pinStateChanged(pin: PINS, state) {

        await this.device.Digital.write({ pin, state });


    }
}

