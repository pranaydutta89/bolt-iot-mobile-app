import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../services/appConfig.service';
import { StorageService } from '../services/storage.service';
import { StorageData } from '../enums';
import { IUser } from '../interface';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
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
    private router: Router,
    private authService: AuthService
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
    const userData = await this.authService.signIn(
      FacebookLoginProvider.PROVIDER_ID
    );
    const fbAccessToken = {
      access_token: userData.authToken
    };
    const loginUser = await this.http
      .post<IUser>(
        `${this.appConfig.configs.apiUrl}/public/login`,
        fbAccessToken
      )
      .toPromise();
    this.storage.setData(StorageData.userData, loginUser);
    this.checkLogin();
  }
}
