import { Injectable } from '@angular/core';
import { Environment } from '../enums';
import config from '../config';
import { IAppConfig } from '../interfaces/interface';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public environment = Environment.development;
  public configs: IAppConfig = config[this.environment];

  public async initialize() {}
}
