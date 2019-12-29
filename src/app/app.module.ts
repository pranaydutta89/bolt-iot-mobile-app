import { ComponentsModule } from './components/components.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from './services/storage.service';
import { BoltService } from './services/bolt.service';
import { AppConfigService } from './services/appConfig.service';
import { PipeModule } from './pipes/pipe.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider
} from 'angularx-social-login';
import { TokenInterceptorService } from './services/httpInterceptor.service';
import { PagesModule } from './pages/pages.module';
import AlertService from './services/alert.service';
export function initializeDevices(boltService: BoltService) {
  return (): Promise<any> => {
    return boltService.init();
  };
}
export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => {
    return appConfigService.initialize();
  };
}

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1381508108690230')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PipeModule,
    ComponentsModule,
    PagesModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    AlertService,
    StorageService,
    BoltService,
    AppConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDevices,
      deps: [BoltService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
