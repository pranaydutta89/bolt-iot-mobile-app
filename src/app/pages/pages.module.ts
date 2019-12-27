import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { ComponentsModule } from '../components/components.module';
import { DashBoard } from './dashboard/dashboard.page';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipeModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'dashboard',
        component: DashBoard
      }
    ])
  ],
  declarations: [LoginPage, DashBoard]
})
export class PagesModule {}
