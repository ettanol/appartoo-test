import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './User';
import { Observable, tap, pipe, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonstersService {
  apiServer = 'http://localhost:5000';
  user = localStorage.getItem('pseudo');
  
  constructor(
    private http: HttpClient,
  ) {  }

  // ngOnInit() {
  //   this.getMonsters();
  // }
  
    getUser() {
      return this.http.get<User>(`${this.apiServer}/api/monsters/user/${this.user}`);
    }
  
  getMonsters (): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServer}/api/monsters/getMonsters`);
  }

  addFriend(req: any) {
    return this.http.post(`${this.apiServer}/api/monsters/invite`, {sender : req.sender, receiver: req.receiver}).pipe(shareReplay());
  }

  acceptInvitation(req: any) {
    return this.http.post(`${this.apiServer}/api/monsters/accept`, {sender: req.sender, receiver: this.user}).pipe(shareReplay());
  }

  declineInvitation(req: any) {
    return this.http.post(`${this.apiServer}/api/monsters/decline`, {sender: req.sender, receiver: this.user}).pipe(shareReplay());
  }

  blockUser(req: any) {
    return this.http.post(`${this.apiServer}/api/monsters/block`, {sender: req.sender, receiver: this.user}).pipe(shareReplay());
  }

  modifyUser(formData: any) {
    return this.http.put(`${this.apiServer}/api/monsters/modify/${this.user}`, formData).pipe(shareReplay());
  }
}
