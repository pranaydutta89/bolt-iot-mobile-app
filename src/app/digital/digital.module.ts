import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DigitalListComponent } from './digital.page';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
    declarations: [DigitalListComponent],
    imports: [
        IonicModule,
        CommonModule,
        PipeModule
    ]
})
export class DigitalModule { }