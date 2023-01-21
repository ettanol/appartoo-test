import { Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { shareReplay, pipe, catchError, of, Observable } from 'rxjs';

import { User } from './User';
import { loginRes } from 'src/interfaces/responses';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  apiServer = 'http://localhost:5000';
  user = localStorage.length && localStorage.getItem('pseudo');

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ) {
  }

  ngOnInit(): void {
    
  }

  signUp(pseudo: string, password: string) {
    return this.http.post<User>(`${this.apiServer}/api/auth/signup`, {pseudo, password}).pipe(
      shareReplay(),
      catchError(this.handleError('error', [])),
      );
  }

  login(pseudo:string, password:string ) {
    return this.http.post<loginRes>(`${this.apiServer}/api/auth/login`, {pseudo, password}).pipe(
      shareReplay(),
      );
    }

  logout() {
    return this.http.post(`${this.apiServer}/api/auth/logout`, {user: this.user}).pipe(
      shareReplay(),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`${message}`);
  }
}
