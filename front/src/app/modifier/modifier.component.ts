import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MonstersService } from '../monsters.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent {
  form: FormGroup;
  @Input() isModifierOpen: boolean = false;
  @Output() isModifierOpenChange = new EventEmitter<boolean>();
  formData: FormData = new FormData();
  requiredFileType = "image/jpg";
  fileName: string = '';

  constructor(
    private fb:FormBuilder,
    private monstersService: MonstersService,
    ) {
      this.form = this.fb.group({
      role: ['', Validators.required],
      fileName: ['', Validators.required]
      });
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      
      if (file) {
          this.fileName = file.name;
          this.formData.set("image", file);
      }
    }

    onRoleSelected(event: any) {
      const role = event.target.value;
      this.formData.set('role', role);
    }

    close() {
      this.isModifierOpen = false;
    this.isModifierOpenChange.emit(this.isModifierOpen);
  }

  onSubmit() {
    this.monstersService.modifyUser(this.formData).subscribe(
      () => this.close()
    );
  }
}
