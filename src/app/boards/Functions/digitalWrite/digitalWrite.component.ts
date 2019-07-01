import { IBoard } from './../../../interface';
import { Component, Input } from '@angular/core';
import { IPin } from 'src/app/interface';
import { STATE } from 'bolt-iot-wrapper/dist/Enums';
import { BoltService } from 'src/app/services/bolt.service';
import { ToastService } from 'src/app/services/toast.service';
import { Devices } from 'bolt-iot-wrapper';
import { Messages } from 'src/app/enums';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'digital-write',
    templateUrl: 'digitalWrite.component.html'
})
export class DigitalWriteComponent {
    public STATE = STATE;
    @Input() pinDetails: IPin;
    @Input() board: IBoard;
    @Input() withModal: { name: string };

    constructor(private boltService: BoltService, private toastService: ToastService, private modalCtrl: ModalController) { }
    async changeState(state: STATE) {
        await Devices.addAndRead(this.board.boltProductName, this.board.apiKey).Digital.write({
            pin: this.pinDetails.number,
            state
        });
        this.toastService.success(Messages.success);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
