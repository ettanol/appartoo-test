import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { shareReplay, pipe, catchError, of, Observable, throwError, map } from 'rxjs';

import { User } from './User';
import { loginRes } from 'src/interfaces/responses';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  apiServer = 'http://localhost:5000';
  user = localStorage.length && localStorage.getItem('pseudo');
  isUserLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {
  }

  addInvite(pseudo: string) {
    return this.http.post<User>(`${this.apiServer}/api/auth/addAccount`, {pseudo})
  }

  signUp(pseudo: string, password: string) {
    return this.http.post<User>(`${this.apiServer}/api/auth/signup`, {pseudo, password});
  }

  login(pseudo:string, password:string ) {
    return this.http.post<loginRes>(`${this.apiServer}/api/auth/login`, {pseudo, password}).pipe(
     map(user => {
      user.pseudo && localStorage.setItem('pseudo', user.pseudo);
      user.token && localStorage.setItem('token', user.token);
      return user;
     }));
    }

  logout() {
    return this.http.post(`${this.apiServer}/api/auth/logout`, {user: this.user});
  }

  public isLoggedIn() {
    return this.http.get(`${this.apiServer}/api/auth/isLoggedIn/${this.user}`);
  }
}
