import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoardReadComponent } from './Read/boardRead.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import BoardCUDComponent from './CUD/boardCUD.component';


@NgModule({
    declarations: [BoardReadComponent, BoardCUDComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: 'read\:boardId',
            component: BoardReadComponent
        }, {
            path: 'cud',
            component: BoardCUDComponent
        }])
    ]
})
export class BoardsModule { }
