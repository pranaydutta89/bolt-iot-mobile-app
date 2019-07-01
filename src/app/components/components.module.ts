import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SpeechComponent } from './SpeechRecog/speech.component';


@NgModule({
    declarations: [SpeechComponent],
    imports: [
        IonicModule,
        CommonModule
    ],
    entryComponents: [SpeechComponent],
    exports: [SpeechComponent]
})
export class ComponentsModule {
    constructor() { }
}
