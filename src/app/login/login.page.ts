import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../services/appConfig.service';
import { StorageService } from '../services/storage.service';
import { StorageData } from '../enums';
import { IUser } from '../interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private storage: StorageService,
    private router: Router
  ) {
    this.checkLogin();
  }

  checkLogin() {
    const userData = this.storage.getData<IUser>(StorageData.userData);
    if (userData) {
      this.router.navigate([`${userData.id}/home`]);
    }
  }
  async loginWithFacebook() {
    // const userData: FacebookLoginResponse = await this.fb.login([
    //   'public_profile',
    //   'email'
    // ]);
    // const fbAccessToken = {
    //   access_token: userData.authResponse.accessToken
    // };
    // const loginUser = await this.http
    //   .post<IUser>(
    //     `${this.appConfig.configs.apiUrl}/public/login`,
    //     fbAccessToken
    //   )
    //   .toPromise();
    // this.storage.setData(StorageData.userData, loginUser);
    // this.checkLogin();
  }
}
