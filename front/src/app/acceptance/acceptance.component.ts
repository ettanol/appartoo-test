import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonstersService } from '../monsters.service';

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.css']
})
export class AcceptanceComponent {
  @Input() peopleInvites: string[] =  [];
  @Output() peopleInvitesChange = new EventEmitter<string[]>();

  constructor(
    private monstersService: MonstersService,
  ) { }

  accept(event: any) {
    // send pseudo to friends array
    this.monstersService.acceptInvitation({sender: event.target.parentElement.querySelector('li').innerText}).subscribe((res: any)=>{
      console.log(res.message);
    })
    // retrieve pseudo from peopleInvites array
  }
  decline(event: any) {
    this.monstersService.declineInvitation({sender: event.target.parentElement.querySelector('li').innerText}).subscribe((res: any)=>{
      console.log(res.message);
    })
  }
  block(event: any) {
    this.monstersService.blockUser({sender: event.target.parentElement.querySelector('li').innerText}).subscribe((res: any)=>{
      console.log(res.message);
    })
  }
}
