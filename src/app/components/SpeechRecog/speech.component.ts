import { BoltService } from 'src/app/services/bolt.service';
import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { IBoard } from 'src/app/interface';
import { StorageData } from 'src/app/enums';
import { STATE } from 'bolt-iot-wrapper/dist/Enums';

@Component({
    templateUrl: 'speech.component.html',
    selector: 'speech'
})
export class SpeechComponent {

    constructor(private speechRecognition: SpeechRecognition,
        private storageService: StorageService,
        private boltService: BoltService) { }
    public async listen() {
        if (!await this.speechRecognition.hasPermission()) {
            await this.speechRecognition.requestPermission();
        }

        const keywords = await this.speechRecognition.startListening().toPromise();
        this.execute(keywords);
    }

    private execute(keywords: string[]) {
        if (keywords[0]) {
            const board = this.storageService.getData<IBoard[]>(StorageData.boards).find(r => r.name === keywords[0]);
            if (board) {
                if (keywords[1]) {
                    const pin = board.pins.find(r => r.name === keywords[1]);
                    if (pin) {
                        if (keywords[2]) {
                            switch (keywords[2]) {
                                case 'on':
                                    pin.value = STATE.low;
                                    this.boltService.digitalWrite(board, pin);
                                    break;

                                case 'off':
                                    pin.value = STATE.high;
                                    this.boltService.digitalWrite(board, pin);
                                    break;

                                default:
                                    pin.value = parseInt(keywords[2], 10);
                                    this.boltService.pwm(board, pin);
                                    break;
                            }
                        }
                        else {
                            // value not present
                        }
                    }
                    else {
                        // invalid pin
                    }
                }
                else {
                    //no mention of pin
                }
            }
            else {
                //invalid board
            }
        }
        else {
            // invalid speech
        }
    }
}