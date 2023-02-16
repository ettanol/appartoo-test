import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-redirect',
  templateUrl: './log-redirect.component.html',
  styleUrls: ['./log-redirect.component.css']
})
export class LogRedirectComponent implements OnInit {

  log: string = "";

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    if (!this.router.url.includes('network')) {
      this.log = this.router.url.includes('login') ? 'login' : 'signup';
    }
  }
}
