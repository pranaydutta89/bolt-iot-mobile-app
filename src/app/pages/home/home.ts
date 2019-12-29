import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouteConfigLoadEnd,
  Router
} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfig.service';
import { IHome, IRoom, IBolt, IUser } from 'src/app/interfaces/mainEntities';
import { ActionSheetController, ModalController } from '@ionic/angular';
import AlertService from 'src/app/services/alert.service';
import { AddMemberPage } from './modals/addMembers/addMembers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export default class HomePage {
  public homeId = this.route.snapshot.paramMap.get('homeId');
  public newHomeForm = this.formBuilder.group({
    homeName: ['', [Validators.required]]
  });

  public existingHomeForm = this.formBuilder.group({
    homeName: ['', [Validators.required]]
  });
  public home: IHome = {} as IHome;
  public rooms: IRoom[] = [] as IRoom[];
  public bolts: IBolt[] = [] as IBolt[];
  public homeUsers: IUser[] = [] as IUser[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appConfig: AppConfigService,
    public actionSheetController: ActionSheetController,
    public alertService: AlertService,
    public modalController: ModalController
  ) {
    this.init();
  }

  async getHomeUser() {
    this.homeUsers = await this.http
      .get<IUser[]>(
        `${this.appConfig.configs.apiUrl}/private/homeuser/${this.homeId}`
      )
      .toPromise();
  }
  async init() {
    if (this.homeId !== 'new') {
      const getData = await Promise.all([
        this.http
          .get<IHome>(
            `${this.appConfig.configs.apiUrl}/private/home/${this.homeId}`
          )
          .toPromise(),
        this.http
          .get<IRoom[]>(
            `${this.appConfig.configs.apiUrl}/private/home/${this.homeId}/rooms`
          )
          .toPromise(),
        this.http
          .get<IBolt[]>(
            `${this.appConfig.configs.apiUrl}/private/home/${this.homeId}/bolts`
          )
          .toPromise(),
        this.getHomeUser()
      ]);
      this.home = getData[0];
      this.rooms = getData[1];
      this.bolts = getData[2];
    }
  }

  async addNewHome() {
    const data = await this.http
      .post<IHome>(`${this.appConfig.configs.apiUrl}/private/home`, this.home)
      .toPromise();
    this.router.navigate([`home/${data.id}`]);
  }

  async homeUserActionSheet({ id }) {
    const operations = {
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.alertService
              .confirmDialog('Action will permanently delete member')
              .then(async () => {
                await this.http
                  .delete(
                    `${this.appConfig.configs.apiUrl}/private/homeuser/${id}`
                  )
                  .toPromise();
                this.homeUsers.splice(
                  this.homeUsers.findIndex(r => r.id === id),
                  1
                );
              });
          }
        },
        {
          text: 'Add Member',
          icon: 'add',
          handler: () => {
            this.modalController
              .create({
                component: AddMemberPage,
                componentProps: {
                  homeId: this.homeId
                }
              })
              .then(async modal => {
                await modal.present();
                await modal.onWillDismiss();
                await this.getHomeUser();
              });
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };
    const actionSheet = await this.actionSheetController.create(operations);
    await actionSheet.present();
  }
  async boltActionSheet({ id }) {
    const operations = {
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.alertService
              .confirmDialog('Action will permanently delete bolt')
              .then(async () => {
                await this.http
                  .delete(`${this.appConfig.configs.apiUrl}/private/bolt/${id}`)
                  .toPromise();
                this.bolts.splice(
                  this.bolts.findIndex(r => r.id === id),
                  1
                );
              });
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.router.navigate([`/home/${this.homeId}/bolt/${id}`]);
          }
        },
        {
          text: 'Add Bolt',
          icon: 'add',
          handler: () => {
            this.router.navigate([`/home/${this.homeId}/bolt/new`]);
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };
    const actionSheet = await this.actionSheetController.create(operations);
    await actionSheet.present();
  }

  async roomActionSheet({ id }) {
    const operations = {
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.alertService
              .confirmDialog('Action will permanently delete room')
              .then(async () => {
                await this.http
                  .delete(`${this.appConfig.configs.apiUrl}/private/room/${id}`)
                  .toPromise();
                this.rooms.splice(
                  this.rooms.findIndex(r => r.id === id),
                  1
                );
              });
          }
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.router.navigate([`/home/${this.homeId}/room/${id}`]);
          }
        },
        {
          text: 'Add Room',
          icon: 'add',
          handler: () => {
            this.router.navigate([`/home/${this.homeId}/room/new`]);
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    };
    const actionSheet = await this.actionSheetController.create(operations);
    await actionSheet.present();
  }

  async editExistingHome() {
    const data = await this.http
      .put<IHome>(
        `${this.appConfig.configs.apiUrl}/private/home/${this.homeId}`,
        this.home
      )
      .toPromise();
    window.location.reload();
  }
}
