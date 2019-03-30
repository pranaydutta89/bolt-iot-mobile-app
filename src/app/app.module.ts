import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from './services/storage.service';
import { DeviceService } from './services/device.service';
import { AppConfigService } from './services/appConfig.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationsService } from './services/notifications.service';

// @ts-ignore
const global = window.globalThis;
global.fetch = window.fetch.bind(window);
export function initializeDevices(deviceService: DeviceService) {
  return (): Promise<any> => {
    return deviceService.init();
  };
}
export function initializeApp(appConfigService: AppConfigService) {
  return (): Promise<any> => {
    return appConfigService.initialize();
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    DeviceService,
    BackgroundMode,
    LocalNotifications,
    NotificationsService,
    AppConfigService,
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    },
    {
      provide: APP_INITIALIZER, useFactory: initializeDevices, deps: [DeviceService], multi: true
    }
    ,
    {
      provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
