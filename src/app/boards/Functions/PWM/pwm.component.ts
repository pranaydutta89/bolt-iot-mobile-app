import { BoltService } from 'src/app/services/bolt.service';
import { Component, Input } from '@angular/core';
import { IPin, IBoard } from 'src/app/interfaces/interface';
import { Devices } from 'bolt-iot-wrapper';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'pwm',
    templateUrl: 'pwm.component.html'
})
export class PWMComponent {

    constructor(private boltService: BoltService, private modalCtrl: ModalController) { }
    @Input() board: IBoard;
    @Input() pinDetails: IPin;
    @Input() withModal: { name: string };

    async sliderChanged(event: any) {
        this.pinDetails.value = event.detail.value;
        await this.boltService.pwm(this.board, this.pinDetails);
    }
    dismiss() {
        this.modalCtrl.dismiss();
    }
}
