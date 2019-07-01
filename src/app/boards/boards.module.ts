import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoardReadComponent } from './Read/boardRead.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoardCUDComponent } from './CUD/boardCUD.component';
import { DigitalWriteComponent } from './Functions/digitalWrite/digitalWrite.component';
import { DigtialReadComponent } from './Functions/digitalRead/digitalRead.component';
import { PWMComponent } from './Functions/PWM/pwm.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
    declarations: [BoardReadComponent, BoardCUDComponent, DigitalWriteComponent, DigtialReadComponent, PWMComponent],
    imports: [
        IonicModule,
        ComponentsModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([{
            path: 'read/:boardId',
            component: BoardReadComponent
        }, {
            path: 'cud/:boardId',
            component: BoardCUDComponent
        }])
    ],
    entryComponents: [DigitalWriteComponent, DigtialReadComponent, PWMComponent],
    exports: [DigitalWriteComponent, DigtialReadComponent, PWMComponent]
})
export class BoardsModule {
    constructor() { }
}
