import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IBoard, IPin } from 'src/app/interface';
import { StorageData, PinType } from 'src/app/enums';
import { v4 } from 'uuid';
import { BoltService } from 'src/app/services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'board-cud',
    templateUrl: 'boardCUD.component.html'
})
export class BoardCUDComponent {


    public cudForm: FormGroup;
    public board: IBoard;
    public pins = Object.keys(PINS);
    public pinDetails = PINS;
    public STATE = STATE;

    public pinType = PinType;
    constructor(private storage: StorageService, private route: ActivatedRoute, private formBuilder: FormBuilder,
        private boltService: BoltService, public toastService: ToastService) {
        this.init();
        //this.cudFormBuilder();
    }

    private cudFormBuilder() {
        this.cudForm = this.formBuilder.group({
            basicInfo: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(50)
            ]))
        })
    }

    private init() {
        if (this.route.snapshot.paramMap.get('boardId') === 'new') {
            this.board = {
                name: '',
                apiKey: '',
                boltProductName: '',
                id: v4(),
                pins: [],
                description: ''
            };
        } else {
            this.board = this.storage.getData<IBoard[]>(StorageData.boards).find(r => r.id === this.route.snapshot.paramMap.get('boardId'));
        }
    }
    public isPinTaken(pinNumer: PINS) {
        return this.board.pins.find(r => r.number === pinNumer);
    }
    public addBoard() {
        //  this.boards.push();
    }

    public pinName(pin: IPin) {
        if (!pin.name) {
            pin.number = null;
            pin.type = null;
        }
    }

    public async save() {
        await this.checkBoardStatus();
        //  this.storage.setData(StorageData.boards, this.boards);
        this.boltService.init();
        this.toastService.success('Board Details Saved');
    }

    public async checkBoardStatus() {

        if (!Devices.isDeviceAdded(this.board.boltProductName)) {
            this.boltService.addDevice(this.board.boltProductName, this.board.apiKey);
        }
        if (!await this.boltService.readDevice(this.board.boltProductName).Utility.isOnline()) {
            const msg = `Bolt Device ${this.board.boltProductName} is offline`;
            this.toastService.error(msg);
            return await Promise.reject(msg);
        }
    }
}

