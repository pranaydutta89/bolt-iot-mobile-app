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
import { IBolt, IAppliance } from 'src/app/interfaces/mainEntities';

const formValdiations = {
  boltProductName: ['', [Validators.required]],
  apiKey: ['', [Validators.required]]
};
@Component({
  selector: 'app-bolt',
  templateUrl: 'bolt.html',
  styleUrls: ['bolt.scss']
})
export default class BoltPage {
  public homeId = this.route.snapshot.paramMap.get('homeId');
  public boltId = this.route.snapshot.paramMap.get('boltId');

  public newBoltForm = this.formBuilder.group(formValdiations);

  public existingBoltForm = this.formBuilder.group(formValdiations);
  public bolt: IBolt = {} as IBolt;
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
    if (this.boltId !== 'new') {
      this.bolt = await this.http
        .get<IBolt>(
          `${this.appConfig.configs.apiUrl}/private/bolt/${this.boltId}`
        )
        .toPromise();
    }
  }

  async addNewBolt() {
    const data = await this.http
      .post<IBolt>(
        `${this.appConfig.configs.apiUrl}/private/home/${this.homeId}/bolt`,
        this.bolt
      )
      .toPromise();
    this.router.navigate([`home/${this.homeId}/bolt/${data.id}`]);
  }

  async editExistingBolt() {
    const data = await this.http
      .put<IBolt>(
        `${this.appConfig.configs.apiUrl}/private/bolt/${this.boltId}`,
        this.bolt
      )
      .toPromise();
  }
}
