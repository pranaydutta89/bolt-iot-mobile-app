import { IBoard } from '../interface';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Boards, StorageData } from '../enums';

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
  constructor(route: ActivatedRoute, private boltService: BoltService,
    private Storage: StorageService, public toastController: ToastController) {
    route.params.subscribe(val => {
      this.boards = this.Storage.getData<IBoard[]>(StorageData.boards);
    });
  }


  async isDeviceOnline(product: IBoard) {
    product.isOnline = await this.boltService.readDevice(product.boltProductName).Utility.isOnline();
  }



}
