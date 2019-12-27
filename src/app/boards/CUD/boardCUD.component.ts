import { PINS, STATE } from 'bolt-iot-wrapper/dist/Enums';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IBoard, IPin } from 'src/app/interfaces/interface';
import { StorageData, PinType } from 'src/app/enums';
import { v4 } from 'uuid';
import { BoltService } from 'src/app/services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DigtialReadComponent } from '../Functions/digitalRead/digitalRead.component';
import { DigitalWriteComponent } from '../Functions/digitalWrite/digitalWrite.component';
import { PWMComponent } from '../Functions/PWM/pwm.component';
@Component({
    selector: 'board-cud',
    templateUrl: 'boardCUD.component.html'
})
export class BoardCUDComponent {


    public cudForm: FormGroup;
    public board: IBoard;
    public boardId = this.route.snapshot.paramMap.get('boardId');
    public pins = Object.keys(PINS);
    public pinDetails = PINS;
    public STATE = STATE;

    public pinType = PinType;
    constructor(private storage: StorageService, private navctrl: NavController, private modalController: ModalController,
        private route: ActivatedRoute, private formBuilder: FormBuilder,
        private boltService: BoltService, public toastService: ToastService) {
        this.init();
        // this.cudFormBuilder();
    }
    private init() {
        if (this.boardId === 'new') {
            this.board = {
                name: '',
                apiKey: '',
                boltProductName: '',
                id: v4(),
                pins: [],
                description: ''
            };
        } else {
            this.board = this.storage.getData<IBoard[]>(StorageData.boards).find(r => r.id === this.boardId);
        }
    }
    public isPinTaken(pinNumer: PINS) {
        return this.board.pins.find(r => r.number === pinNumer);
    }

    public pinName(pin: IPin) {
        if (!pin.name) {
            pin.number = null;
            pin.type = null;
        }
    }

    public async delete() {
        const boards = this.storage.getData<IBoard[]>(StorageData.boards);
        const boardIdx = boards.findIndex(r => r.id === this.board.id);
        boards.splice(boardIdx, 1);
        this.storage.setData(StorageData.boards, boards);
        this.navctrl.navigateRoot('/home');
        this.toastService.success('Board Details Deleted');
    }

    public async save() {
        await this.checkBoardStatus();
        const boards = this.storage.getData<IBoard[]>(StorageData.boards);
        if (this.boardId === 'new') {
            boards.push(this.board);
        } else {
            const boardIdx = boards.findIndex(r => r.id === this.board.id);
            boards.splice(boardIdx, 1, this.board);
        }

        this.storage.setData(StorageData.boards, boards);
        this.boltService.init();
        this.toastService.success('Board Details Saved');
        this.navctrl.navigateRoot('/home');
    }

    public async checkBoardStatus() {

        if (!await Devices.addAndRead(this.board.boltProductName, this.board.apiKey).Utility.isOnline()) {
            const msg = `Bolt Device ${this.board.boltProductName} is offline`;
            this.toastService.error(msg);
            return await Promise.reject(msg);
        }
    }

    public async testPin(pin: IPin) {
        let modal;
        await this.checkBoardStatus();
        switch (pin.type) {
            case PinType.digitalRead:
                modal = await this.modalController.create({
                    component: DigtialReadComponent,
                    componentProps: { pinDetails: pin, board: this.board, withModal: { name: 'Test' } }
                });
                break;

            case PinType.digitalWrite:
                modal = await this.modalController.create({
                    component: DigitalWriteComponent,
                    componentProps: { pinDetails: pin, board: this.board, withModal: { name: 'Test' } }
                });
                break;

            case PinType.pwm:
                modal = await this.modalController.create({
                    component: PWMComponent,
                    componentProps: { pinDetails: pin, board: this.board, withModal: { name: 'Test' } }
                });
                break;

        }

        return await modal.present();
    }
}

