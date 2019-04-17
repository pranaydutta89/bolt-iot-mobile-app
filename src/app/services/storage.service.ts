import { Injectable } from '@angular/core';
import { StorageData, Products } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    this.initialize();
  }


  initialize() {
    if (!this.getData(StorageData.boards)) {
      this.setData(StorageData.boards, []);
    }
  }

  getData<T>(type: StorageData): T {
    const data = localStorage.getItem(type.toString());
    if (data) {
      return JSON.parse(localStorage.getItem(type.toString())) as T;
    } else {
      return null;
    }
  }

  setData(type: StorageData, data: any) {
    localStorage.setItem(type.toString(), JSON.stringify(data));
  }


}
