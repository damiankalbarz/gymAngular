import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  isChatOpen = false;
  message = '';
  messages: { sender: string, content: string }[] = [];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat(event: MouseEvent) {
    event.stopPropagation();
    this.isChatOpen = false;
  }

  sendMessage() {
    if (this.message.trim()) {
      this.messages.push({ sender: 'user', content: this.message });
      this.message = '';
      // Można tutaj dodać logikę wysyłania wiadomości do serwera
    }
  }
}
