import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../services/appConfig.service';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  constructor(
    private fb: Facebook,
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}
  async loginWithFacebook() {
    const userData: FacebookLoginResponse = await this.fb.login([
      'public_profile',
      'email'
    ]);
    const fbAccessToken = {
      access_token: userData.authResponse.accessToken
    };
    const loginUser = await this.http
      .post(`${this.appConfig.configs.apiUrl}/public/login`, fbAccessToken)
      .toPromise();
    debugger;
  }
}
