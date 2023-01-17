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
      pseudo: ['',Validators.required],
      password: ['',Validators.required]
      });
    }

    login() {
      const val = this.form.value;

      if (val.pseudo && val.password) {
          this.authService.login(val.pseudo, val.password)
              .subscribe(
                  (res) => {
                    localStorage.setItem('token', res.token);
                    this.router.navigateByUrl('/network');
                  }
              );
      }
    }
}
