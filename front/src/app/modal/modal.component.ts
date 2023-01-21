import { Component, Input } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  messages: string[] = [];
  @Input() childItem: boolean = false;

  constructor(
    private messageService: MessageService,
  ) {
    this.messages = this.messageService.messages;
  }

  closeModal() {
    this.childItem = !this.childItem;
  }
}
