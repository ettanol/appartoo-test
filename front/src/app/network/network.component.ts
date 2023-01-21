import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';

import { MonstersService } from '../monsters.service';
import { User } from '../User';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit{
  monsters: User[] = [] ;
  isModalOpen: boolean = false;
  user: any = {};
  pseudo = localStorage.getItem('pseudo');
  peopleInvites: string[] =  [];
  openModifier: boolean = false;
  openAcceptance: boolean = false;
  
  constructor(
    private monstersService: MonstersService,
    private authService: AuthService,
    ) {
      
    }
    
  ngOnInit(): void {
      this.getMonsters();
      this.getUser();
      this.openModal();
  }
    
  getMonsters(): void {
      this.monstersService.getMonsters()
      .subscribe(monsters => this.monsters = monsters);
  }
    
  getUser() {
    this.monstersService.getUser()
    .subscribe(user =>{
      if(user.role === '') {this.openModifier = true;}
      if(user.peopleInvites.length) {
        this.openAcceptance = true;
        this.peopleInvites = user.peopleInvites;
      }
      this.user = user});
  }

  addFriend(e: any) {
    let inviteInfos = {sender: this.pseudo, receiver: e.currentTarget.previousSibling.innerText}
    this.monstersService.addFriend(inviteInfos).subscribe();
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
