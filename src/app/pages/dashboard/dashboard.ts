import { IBoard } from '../../interfaces/interface';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageData } from '../../enums';
import { HttpClient } from '@angular/common/http';

import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { BoltService } from '../../services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';
import { IHome } from '../../interfaces/mainEntities';
import { AppConfigService } from '../../services/appConfig.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss']
})
export class DashBoard {
  public homes: IHome[];
  public loadingState: string = 'noHomes';
  constructor(
    private route: ActivatedRoute,
    private boltService: BoltService,
    private Storage: StorageService,
    public toastController: ToastController,
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {
    this.init();
  }

  async init() {
    this.homes = await this.http
      .get<IHome[]>(
        `${this.appConfig.configs.apiUrl}/private/currentuser/homes`
      )
      .toPromise();
    this.loadingState = 'homes';
  }
}
