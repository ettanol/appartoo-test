import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  message: string[] = [];
  constructor(
    private messageService: MessageService,
  ) {
    this.message = this.messageService.messages;
  }
}
