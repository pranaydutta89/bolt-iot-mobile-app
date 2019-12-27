import { IBoard } from '../interfaces/interface';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageData } from '../enums';

import { StorageService } from '../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { BoltService } from '../services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';
import { IHome } from '../interfaces/mainEntities';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public userId = this.route.snapshot.paramMap.get('userId');
  public homes: IHome[];
  public loadingState: string;
  constructor(
    private route: ActivatedRoute,
    private boltService: BoltService,
    private Storage: StorageService,
    public toastController: ToastController
  ) {
    this.init();
  }

  init() {}
}
