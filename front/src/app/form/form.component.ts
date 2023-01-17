import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  isLoginOpen: boolean = false;
  isSignUpOpen: boolean = false;

  setLoginForm() {
    this.isLoginOpen = !this.isLoginOpen;
    console.log(this.isLoginOpen);
    if(this.isSignUpOpen) {this.isSignUpOpen = false;} 
  }
  setSignUpForm() {
    this.isSignUpOpen = !this.isSignUpOpen;
    console.log(this.isSignUpOpen);
    if(this.isLoginOpen) {this.isLoginOpen = false;} 
  }
}
