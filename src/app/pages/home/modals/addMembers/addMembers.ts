import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IHomeUser } from 'src/app/interfaces/mainEntities';
import { AppConfigService } from 'src/app/services/appConfig.service';

@Component({
  selector: 'app-add-member',
  templateUrl: 'addMembers.html',
  styleUrls: ['addMembers.scss']
})
export class AddMemberPage {
  public memberForm = this.formBuilder.group({
    memberName: ['', [Validators.required]],
    memberEmail: ['', [Validators.required, Validators.email]]
  });

  @Input() homeId: string;
  public memberName: string;
  public memberEmail: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private appConfig: AppConfigService,
    private modalCtrl: ModalController
  ) {}

  async addNewMember() {
    const data = await this.http
      .post<IHomeUser>(`${this.appConfig.configs.apiUrl}/private/homeuser`, {
        email: this.memberEmail,
        name: this.memberName,
        homeId: this.homeId
      })
      .toPromise();
    this.modalCtrl.dismiss(data);
  }
}
