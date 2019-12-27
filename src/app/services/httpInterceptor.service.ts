import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  async init() {
    const load = await this.loadingController.create({
      message: 'Loading...'
    });
    this.loading = load;
  }

  async toggleLoader(show = true) {
    if (this.loading) {
      if (show) {
        if (this.loaderCount === 0) {
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
    // We retrieve the token, if any
    this.toggleLoader();
    const { jwtToken } = this.storage.getData<IUserLoginData>(
      StorageData.userData
    );
    let newHeaders = req.headers;
    if (jwtToken) {
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.append('authorization', jwtToken);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq).pipe(
      // We use the map operator to change the data from the response

      map(evt => {
        if (evt instanceof HttpResponse) {
          this.toggleLoader(false);
          return evt;
        }
      }),
      catchError((err: any) => {
        this.toggleLoader(false);
        return of(err);
      })
    );
  }
}
