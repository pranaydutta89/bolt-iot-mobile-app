import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: 'editableInputBox.html'
})
export default class EditableInputBox {
  @Input() label: string;
  @Input() val: string;
  @Output() valChange = new EventEmitter();
  @Input() controlName: string;

  @Input() formName: string;

  public editMode = false;

  constructor() {}
  ngOnInit() {}
}
