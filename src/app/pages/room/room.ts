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
import { IRoom, IBolt, IAppliance } from 'src/app/interfaces/mainEntities';

@Component({
  selector: 'app-room',
  templateUrl: 'room.html',
  styleUrls: ['room.scss']
})
export default class RoomPage {
  public roomId = this.route.snapshot.paramMap.get('roomId');
  public homeId = this.route.snapshot.paramMap.get('homeId');

  public newRoomForm = this.formBuilder.group({
    roomName: ['', [Validators.required]]
  });

  public existingRoomForm = this.formBuilder.group({
    roomName: ['', [Validators.required]]
  });
  public room: IRoom = {} as IRoom;
  public appliances: IRoom[] = [] as IAppliance[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {
    this.init();
  }

  async init() {
    if (this.roomId !== 'new') {
      const getData = await Promise.all([
        this.http
          .get<IRoom>(
            `${this.appConfig.configs.apiUrl}/private/room/${this.roomId}`
          )
          .toPromise(),
        this.http
          .get<IRoom[]>(
            `${this.appConfig.configs.apiUrl}/private/room/${this.roomId}/appliances`
          )
          .toPromise()
      ]);
      this.room = getData[0];
      this.appliances = getData[1];
    }
  }

  async addNewRoom() {
    const data = await this.http
      .post<IRoom>(
        `${this.appConfig.configs.apiUrl}/private/home/${this.homeId}/room`,
        this.room
      )
      .toPromise();
    this.router.navigate([`home/${this.homeId}/room/${data.id}`]);
  }

  async editExistingRoom() {
    const data = await this.http
      .put<IRoom>(
        `${this.appConfig.configs.apiUrl}/private/room/${this.roomId}`,
        this.room
      )
      .toPromise();
  }
}
