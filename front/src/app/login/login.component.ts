import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

    login() {
      const val = this.form.value;

      if (val.pseudo && val.password) {
          this.authService.login(val.pseudo, val.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/network');
                  }
              );
      }
    }
}
