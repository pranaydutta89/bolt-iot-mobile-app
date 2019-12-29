import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BoltService } from '../services/bolt.service';
import { StorageService } from '../services/storage.service';
import EditableInputBox from './EditableInputBox/editableInputBox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [EditableInputBox],
  exports: [EditableInputBox]
})
export class ComponentsModule {
  constructor() {}
}
