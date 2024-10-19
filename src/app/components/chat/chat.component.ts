import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: any[] = [];
  message: string = '';
  isAdminOrManager: boolean = false;  // Zmienna do sprawdzania, czy użytkownik jest adminem lub managerem

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.chatService.connect();
    this.chatService.getMessageSubject().subscribe((message: any) => {
      this.messages.push(message);
    });

    // Sprawdź, czy użytkownik ma rolę administratora lub managera
    this.isAdminOrManager = this.authService.hasRole('ADMIN') || this.authService.hasRole('MANAGER');
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  adminReply() {
    this.chatService.adminReply(this.message);
    this.message = '';
  }
}
