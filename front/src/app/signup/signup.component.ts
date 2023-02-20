import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup;
  @Input() isFormOpen: boolean = true;
  @Output() isFormOpenChange = new EventEmitter<boolean>();


  constructor(
    private fb:FormBuilder, 
    private authService: AuthService,
    private route: Router,
    ) {
      this.form = this.fb.group({
      pseudo: ['',Validators.required],
      password: ['',Validators.required]
      });
    }

  signUp() {
    const val = this.form.value;

    if(val.pseudo && val.password) {
      this.authService.signUp(val.pseudo, val.password)
      .subscribe(
        () => {this.route.url.includes('signup') ? alert("You've been successfully registered ! You'll be redirected to the login page.") : alert("You've successfully created an account !");},
        error => {
          if(error) {console.error(error)};
        },
        () => {
          if(this.route.url.includes('signup')) {
            this.route.navigate(['/login']);
          } else if(this.route.url.includes('network')){
            this.form.reset();
            this.isFormOpen = false;
            this.isFormOpenChange.emit(this.isFormOpen);
          }
        }
        );

    }
  }
}
