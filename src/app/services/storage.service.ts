import { Injectable } from '@angular/core';
import { StorageData } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  getData(type: StorageData) {
    return JSON.parse(localStorage.getItem(type.toString()));
  }

  setData(type: StorageData, data: any) {
    localStorage.setItem(type.toString(), JSON.stringify(data));
  }
}
