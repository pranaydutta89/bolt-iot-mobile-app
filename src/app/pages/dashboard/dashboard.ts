import { IBoard } from '../../interfaces/interface';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageData } from '../../enums';
import { HttpClient } from '@angular/common/http';

import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoltService } from '../../services/bolt.service';
import { Devices } from 'bolt-iot-wrapper';
import { IHome } from '../../interfaces/mainEntities';
import { AppConfigService } from '../../services/appConfig.service';
import { ActionSheetController } from '@ionic/angular';
import AlertService from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.scss']
})
export class DashBoard {
  public homes: IHome[];
  public loadingState: string = 'noHomes';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boltService: BoltService,
    private Storage: StorageService,
    public toastController: ToastController,
    private http: HttpClient,
    private appConfig: AppConfigService,
    public actionSheetController: ActionSheetController,
    public alertService: AlertService
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

  deleteHome(homeId: string) {
    this.alertService
      .confirmDialog('Action will permanently delete home')
      .then(async () => {
        await this.http
          .delete(`${this.appConfig.configs.apiUrl}/private/home/${homeId}`)
          .toPromise();
        this.homes.splice(
          this.homes.findIndex(r => r.id === homeId),
          1
        );
      });
  }

  async openHomeActions({ id, isAdmin }) {
    const adminOperations = [
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: this.deleteHome.bind(this, id)
      },
      {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.router.navigate([`/home/${id}`]);
        }
      }
    ];
    const operations = {
      header: 'Actions',
      buttons: [
        {
          text: 'View',
          icon: 'eye',
          handler: () => {
            this.router.navigate([`/home/${id}`]);
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ].concat(isAdmin ? adminOperations : [])
    };
    const actionSheet = await this.actionSheetController.create(operations);
    await actionSheet.present();
  }
}
