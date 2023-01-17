import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonstersService implements OnInit{
  apiServer = 'http://localhost:5000';
  
  constructor(
    private http: HttpClient,
  ) {  }

  ngOnInit() {
    this.getMonsters();
  }
  
  getMonsters (): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServer}/api/monsters/getMonsters`);
  }

  addFriend() {
    console.log('invitation sent !')
  }
}
