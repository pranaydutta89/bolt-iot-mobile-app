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
        this.speechRecognition.startListening().subscribe((keywords: Array<string>) => {
            this.execute(keywords[0].split(' '));
        });

    }

    private execute(keywords: string[]) {
        if (keywords[0]) {
            const boards = this.storageService.getData<IBoard[]>(StorageData.boards);
            const board = boards.find(r => r.name.toLowerCase() === keywords[0].toLowerCase());
            if (board) {
                if (keywords[1]) {
                    const pin = board.pins.find(r => r.name.toLowerCase() === keywords[1].toLowerCase());
                    if (pin) {
                        if (keywords[2]) {
                            switch (keywords[2]) {
                                case 'start':
                                case 'on':
                                    pin.value = STATE.low;
                                    this.boltService.digitalWrite(board, pin);
                                    break;
                                case 'of':
                                case 'stop':
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