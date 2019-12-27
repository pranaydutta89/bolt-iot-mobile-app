import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { IUserLoginData } from '../interfaces/interface';
import { StorageData } from '../enums';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private loading: HTMLIonLoadingElement;
  private loaderCount = 0;
  constructor(
    private storage: StorageService,
    public loadingController: LoadingController
  ) {}

  async toggleLoader(show = true) {
    if (!this.loading) {
      this.loading = await this.loadingController.create({
        message: 'Loading...'
      });
    }
    if (show) {
      await this.loading.present();
      this.loaderCount += 1;
    } else {
      this.loaderCount -= 1;
      if (this.loaderCount <= 0) {
        await this.loading.dismiss();
        this.loaderCount = 0;
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

      map(resp => {
        if (resp instanceof HttpResponse) {
          this.toggleLoader(false);
          return resp;
        }
      })
    );
  }
}
