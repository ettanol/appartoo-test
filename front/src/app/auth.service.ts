import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';

import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signUp(pseudo: string, password: string) {
    return this.http.post<User>('/api/auth/signup', {pseudo, password})
  }

  login(pseudo:string, password:string ) {
    return this.http.post<User>('/api/auth/login', {pseudo, password})
}
}
