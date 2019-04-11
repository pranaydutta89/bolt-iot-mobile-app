import { PINS } from 'bolt-iot-wrapper/dist/Enums';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IBoards } from 'src/app/interface';
import { StorageData } from 'src/app/enums';
import { v4 } from 'uuid';
import { BoltService } from 'src/app/services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';

@Component({
    selector: 'board-cud',
    templateUrl: 'boardCUD.component.html'
})
export default class BoardCUDComponent {

    public boards: IBoards[];
    public pins = Object.keys(PINS);
    constructor(private storage: StorageService, private boltService: BoltService) {
        this.init();
    }

    private init() {
        this.boards = this.storage.getData<IBoards[]>(StorageData.boards);
    }

    public addBoard() {
        this.boards.push({
            name: '',
            apiKey: '',
            boltProductName: '',
            id: v4(),
            pins: [],
        });
    }

    public async save() {
        await this.checkBoardStatus();
        this.storage.setData(StorageData.boards, this.boards);
        this.boltService.init();
    }

    public discard() {
        this.init();
    }

    public async checkBoardStatus() {
        await this.boards.forEach(async (r) => {
            if (!Devices.isDeviceAdded(r.boltProductName)) {
                this.boltService.addDevice(r.boltProductName, r.apiKey);
            }
            if (!await this.boltService.readDevice(r.boltProductName).
                instance.Utility.isOnline()) {
                throw new Error(`Bolt Device ${r.boltProductName} is offline`);
            }
        });
    }
}
