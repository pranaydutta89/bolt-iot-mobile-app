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
import { IHome, IRoom, IBolt } from 'src/app/interfaces/mainEntities';

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
          .toPromise()
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
