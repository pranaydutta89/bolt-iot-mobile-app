import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login/login';
import { ComponentsModule } from '../components/components.module';
import { DashBoard } from './dashboard/dashboard';
import { PipeModule } from '../pipes/pipe.module';
import RoomPage from './room/room';
import HomePage from './home/home';
import BoltPage from './bolt/bolt';
import { AddMemberPage } from './home/modals/addMembers/addMembers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipeModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPage
      },
      {
        path: 'dashboard',
        component: DashBoard
      },
      {
        path: 'home/:homeId/room/:roomId',
        component: RoomPage
      },
      {
        path: 'home/:homeId/bolt/:boltId',
        component: BoltPage
      },
      {
        path: 'home/:homeId',
        component: HomePage
      }
    ])
  ],
  entryComponents: [AddMemberPage],
  declarations: [
    LoginPage,
    DashBoard,
    RoomPage,
    HomePage,
    BoltPage,
    AddMemberPage
  ]
})
export class PagesModule {}
