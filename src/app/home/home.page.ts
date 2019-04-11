import { IBoards } from './../interface.d';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Boards, StorageData } from '../enums';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public boards = this.Storage.getData<IBoards[]>(StorageData.boards);
  constructor(private Storage: StorageService, public toastController: ToastController) {

  }




}
