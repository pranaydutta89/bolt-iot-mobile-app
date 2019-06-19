import { IBoard } from '../interface';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageData } from '../enums';

import { StorageService } from '../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { BoltService } from '../services/bolt.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public boards: IBoard[];
  public loadingState: string;
  constructor(route: ActivatedRoute, private boltService: BoltService,
    private Storage: StorageService, public toastController: ToastController) {
    route.params.subscribe(val => {
      this.init();
      this.isDeviceOnline(this.Storage.getData<IBoard[]>(StorageData.boards));
    });
  }

  init() {
    this.boards = [];
    this.loadingState = 'noboards';
  }


  async isDeviceOnline(boards: IBoard[]) {
    this.boltService.doShowLoader = false;
    if (boards && boards.length > 0) {
      this.loadingState = 'boards';
    }
    for (const board of boards) {
      board.isOnline = await this.boltService.readDevice(board.boltProductName).Utility.isOnline();
    }
    this.boards = boards;
    this.boltService.doShowLoader = true;
  }

}
