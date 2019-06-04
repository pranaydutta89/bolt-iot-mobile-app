import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IBoards } from 'src/app/interface';
import { StorageData, LoopAction } from 'src/app/enums';
import { v4 } from 'uuid';
import { BoltService } from 'src/app/services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'board-cud',
    templateUrl: 'boardCUD.component.html'
})
export class BoardCUDComponent {

    public boards: IBoards[];
    public pins = Object.keys(PINS);
    public STATE = STATE;
    public loopAction = LoopAction;
    constructor(private storage: StorageService, private boltService: BoltService, public toastService: ToastService) {
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
        this.toastService.success('Board Details Saved');
    }

    public discard() {
        this.init();
    }

    public async checkBoardStatus() {

        for (const board of this.boards) {
            if (!Devices.isDeviceAdded(board.boltProductName)) {
                this.boltService.addDevice(board.boltProductName, board.apiKey);
            }
            if (!await this.boltService.readDevice(board.boltProductName).Utility.isOnline()) {
                const msg = `Bolt Device ${board.boltProductName} is offline`;
                this.toastService.error(msg);
                return await Promise.reject(msg);
            }
        }
    }
}
