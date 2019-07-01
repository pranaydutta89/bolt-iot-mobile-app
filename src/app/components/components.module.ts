import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SpeechComponent } from './SpeechRecog/speech.component';
import { BoltService } from '../services/bolt.service';
import { StorageService } from '../services/storage.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


@NgModule({
    declarations: [SpeechComponent],
    imports: [
        IonicModule,
        CommonModule
    ],
    providers: [SpeechRecognition],
    entryComponents: [SpeechComponent],
    exports: [SpeechComponent]
})
export class ComponentsModule {
    constructor() { }
}
