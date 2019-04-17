import { NgModule } from '@angular/core';
import { FromNowPipe } from './fromNow.pipe';
import { OrderByPipe } from './orderBy.pipe';


@NgModule({
    declarations: [FromNowPipe, OrderByPipe],
    exports: [FromNowPipe, OrderByPipe]
})
export class PipeModule { }
