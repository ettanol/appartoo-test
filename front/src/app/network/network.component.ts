import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { MonstersService } from '../monsters.service';
import { User } from '../User';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, OnChanges{
  monsters: User[] = [] ;
  isModalOpen: boolean = false;
  user: any = {};
  pseudo = localStorage.getItem('pseudo');
  @Input() peopleInvites: string[] =  [];
  listOfFriends: string[] = [];
  openModifier: boolean = false;
  openAcceptance: boolean = false;
  isUserLoggedIn: boolean = false;
  
  constructor(
    private monstersService: MonstersService,
    private authService: AuthService,
    private route: Router,
    ) {
      
    }
    
  ngOnInit(): void {
    this.isLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  
getUser() {
  this.monstersService.getUser()
  .subscribe(user =>{
    if(user.role === '') {this.openModifier = true;}
    if(user.peopleInvites.length) {
      this.openAcceptance = true;
      this.peopleInvites = user.peopleInvites;
    }
    this.listOfFriends = user.friends;
    this.user = user});
}
    
  async getMonsters() {
      this.monstersService.getMonsters()
      .subscribe(async monsters => {
        await this.getUser();
        this.monsters = monsters.filter(monster => monster._id !== this.user._id)
      });
  }

  addFriend(e: any) {
    e.currentTarget.classList.add('selected');
    let inviteInfos = {sender: this.pseudo, receiver: e.currentTarget.previousSibling.innerText}
    this.monstersService.addFriend(inviteInfos).subscribe(
      () => {
        alert(`You've invited ${inviteInfos.receiver}`);
      }
    );
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  isLoggedIn() {
    this.authService.isLoggedIn().subscribe(
      (res: any) => {
      this.isUserLoggedIn = res.isConnected;
      if(this.isUserLoggedIn) {
        this.getUser();
        this.getMonsters();
        this.openModal();
      }
      },() => {
        this.route.navigate(['']);
      });
  }
}
