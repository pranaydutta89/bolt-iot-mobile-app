import { BoltService } from 'src/app/services/bolt.service';
import { Component, Input } from '@angular/core';
import { IPin, IBoard } from 'src/app/interface';
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

    sliderChanged(event: any) {
        Devices.addAndRead(this.board.boltProductName, this.board.apiKey).Analog.pwm({
            pin: this.pinDetails.number,
            value: event.detail.value
        });
    }
    dismiss() {
        this.modalCtrl.dismiss();
    }
}
