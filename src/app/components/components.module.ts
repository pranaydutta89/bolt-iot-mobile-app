import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoltService } from '../services/bolt.service';
import { StorageService } from '../services/storage.service';

@NgModule({
  imports: [IonicModule, CommonModule]
})
export class ComponentsModule {
  constructor() {}
}
