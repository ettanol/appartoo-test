import { Component, OnInit } from '@angular/core';

import { MonstersService } from '../monsters.service';
import { User } from '../User';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit{
  monsters: User[] = [] ;
  constructor(
    private monstersService: MonstersService,
  ) {

  }

  ngOnInit(): void {
    this.getMonsters();
  }
  
  getMonsters(): void {
    this.monstersService.getMonsters()
    .subscribe(monsters => this.monsters = monsters);
  }

  addFriend() {
    this.monstersService.addFriend();
  }
}
