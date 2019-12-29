import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { StorageService } from './storage.service';
import { IUserLoginData } from '../interfaces/interface';
import { StorageData } from '../enums';
import { map, tap, catchError } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private loading: HTMLIonLoadingElement;
  private loaderCount = 0;
  constructor(
    private storage: StorageService,
    public loadingController: LoadingController
  ) {
    this.init();
  }

  async init() {}

  async toggleLoader(show = true) {
    if (this.loading) {
      if (show) {
        if (this.loaderCount === 0) {
          const load = await this.loadingController.create({
            message: 'Loading...'
          });
          this.loading = load;
          this.loaderCount += 1;
          await this.loading.present();
        }
      } else {
        this.loaderCount -= 1;
        if (this.loaderCount <= 0) {
          await this.loading.dismiss();
          this.loaderCount = 0;
        }
      }
    }
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const loader = await this.loadingController.create({
      message: 'Loading...'
    });

    await loader.present();

    const { jwtToken } = this.storage.getData<IUserLoginData>(
      StorageData.userData
    );
    let newHeaders = req.headers;
    if (jwtToken) {
      newHeaders = newHeaders.append('authorization', jwtToken);
    }
    const authReq = req.clone({ headers: newHeaders });

    return next
      .handle(authReq)
      .toPromise()
      .finally(async () => {
        await loader.dismiss();
      });
  }
}
