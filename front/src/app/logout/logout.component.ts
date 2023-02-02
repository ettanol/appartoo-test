import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private authService: AuthService,
    private route: Router
  ) {}

    logout() {
      this.authService.logout().subscribe(() => {
      localStorage.removeItem('pseudo');
      localStorage.removeItem('token');
      this.route.navigate([''])
    });
    }
}
