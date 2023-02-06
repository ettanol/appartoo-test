import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MonstersService } from '../monsters.service';

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.css']
})
export class AcceptanceComponent implements OnChanges{
  @Input() peopleInvites: string[] =  [];
  @Output() peopleInvitesChange = new EventEmitter<string[]>();

  constructor(
    private monstersService: MonstersService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  accept(event: any) {
    this.peopleInvites.splice(this.peopleInvites.indexOf(event.currentTarget.previousSibling.innerText), 1);
    // send pseudo to friends array
    this.monstersService.acceptInvitation({sender: event.target.parentElement.querySelector('li').innerText}).subscribe((res: any)=>{
    })
    // retrieve pseudo from peopleInvites array
  }
  decline(event: any) {
    this.peopleInvites.splice(this.peopleInvites.indexOf(event.currentTarget.previousSibling.innerText), 1);
    this.monstersService.declineInvitation({sender: event.target.parentElement.querySelector('li').innerText}).subscribe((res: any)=>{
    })
  }
  block(event: any) {
    this.peopleInvites.splice(this.peopleInvites.indexOf(event.currentTarget.previousSibling.innerText), 1);
    this.monstersService.blockUser({sender: event.target.parentElement.querySelector('li').innerText}).subscribe((res: any)=>{
    })
  }
}
