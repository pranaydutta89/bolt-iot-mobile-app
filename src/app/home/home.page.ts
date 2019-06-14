import { IBoard } from '../interface';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Boards, StorageData } from '../enums';

import { StorageService } from '../services/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public boards;
  constructor(private route: ActivatedRoute, private Storage: StorageService, public toastController: ToastController) {
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.boards = this.Storage.getData<IBoard[]>(StorageData.boards);
    });
  }





}
