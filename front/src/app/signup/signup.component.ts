import { Component } from '@angular/core';
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

  constructor(
    private fb:FormBuilder, 
    private authService: AuthService, 
    private router: Router
    ) {
      this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
      });
    }

  signUp() {
    const val = this.form.value;

    if(val.pseudo && val.password) {
      this.authService.signUp(val.pseudo, val.password)
      .subscribe(
        (res) => {
          console.log(res);
          // this.login();
        }
      );

    }
  }
}
