import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service'

interface Conversation {
  name: string; // Nazwa rozmowy (np. użytkownik lub identyfikator rozmowy)
  messages: { sender: string, content: string }[]; // Lista wiadomości
}



@Component({
  selector: 'app-admin-answers',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-answers.component.html',
  styleUrl: './admin-answers.component.css'
})
export class AdminAnswersComponent {
    conversations: Conversation[] = []; // Lista rozmów
    selectedConversation: Conversation | null = null; // Wybrana rozmowa
    newAdminMessage: string = ''; // Wiadomość od admina

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
      // Połącz się z WebSocket na starcie
      this.chatService.connect();
      console.log("DDSD")

       // Testowanie wiadomości bez serwera
        setTimeout(() => {
          const testMessage = { sender: 'TestUser', content: 'Hello from test' };
          this.addMessageToConversation(testMessage);
        }, 3000);  // Symulowanie opóźnienia 3 sekund

      // Odbieraj wiadomości z serwera i dodawaj je do odpowiednich rozmów
      this.chatService.getMessageSubject().subscribe((message: any) => {
        this.addMessageToConversation(message);
        console.log("FFF"+message);
      });
    }

    // Dodaj wiadomość do rozmowy
    addMessageToConversation(message: any): void {
     console.log('Dodawanie wiadomości do rozmowy:', message);
      // Sprawdź, czy rozmowa już istnieje
      let conversation = this.conversations.find(conv => conv.name === message.sender);


      if (!conversation) {
        // Jeśli rozmowa nie istnieje, stwórz nową
        conversation = { name: message.sender, messages: [] };
        this.conversations.push(conversation);
      }

      // Dodaj wiadomość do odpowiedniej rozmowy
      conversation.messages.push({ sender: message.sender, content: message.content });
      console.log('Zaktualizowana lista rozmów:', this.conversations);  // Sprawdź aktualizację listy rozmów

    }

    // Odpowiedz jako admin
    sendAdminReply(): void {
      if (this.newAdminMessage.trim() && this.selectedConversation) {
        const adminMessage = { sender: 'Admin', content: this.newAdminMessage };

        // Dodaj wiadomość do wybranej rozmowy lokalnie
        this.selectedConversation.messages.push(adminMessage);

        // Wyślij odpowiedź jako admin przez WebSocket
        this.chatService.adminReply(this.newAdminMessage);

        // Wyczyść pole po wysłaniu wiadomości
        this.newAdminMessage = '';
      }
    }

    // Wybierz rozmowę
    selectConversation(conversation: Conversation): void {
      console.log('Wybrano rozmowę z:', conversation.name);  // Sprawdź, czy rozmowa jest wybierana poprawnie
      this.selectedConversation = conversation;
    }
}
