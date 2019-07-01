import { ModalController } from '@ionic/angular';
import { IDigitalReturn } from 'bolt-iot-wrapper/dist/Interfaces';
import { BoltService } from 'src/app/services/bolt.service';
import { Component, Input } from '@angular/core';
import { IPin, IBoard } from 'src/app/interface';
import { ToastService } from 'src/app/services/toast.service';
import { Messages } from 'src/app/enums';
import { STATE } from 'bolt-iot-wrapper/dist/Enums';
import { Devices } from 'bolt-iot-wrapper';

@Component({
    selector: 'digital-read',
    templateUrl: 'digitalRead.component.html'
})
export class DigtialReadComponent {

    constructor(private boltService: BoltService, private toastService: ToastService, private modalCtrl: ModalController) { }

    public STATE = STATE;
    @Input() pinDetails: IPin;
    @Input() board: IBoard;
    @Input() withModal: { name: string };
    async read() {
        const res = await this.boltService.digitalRead(this.board, this.pinDetails);
        this.pinDetails.value = res.state;
        this.toastService.success(Messages.success);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
