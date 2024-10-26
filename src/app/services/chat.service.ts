import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  private messageSubject = new Subject<any>();

  constructor() { }

  connect() {
    const socket = new SockJS('http://localhost:8080/chat');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function () {
      console.log('Połączono z WebSocket!');
      _this.stompClient.subscribe('/topic/messages', function (message: any) {
           console.log('Otrzymana wiadomość z serwera:', message.body);
        _this.messageSubject.next(JSON.parse(message.body));
      });
    },function (error: any) {
        console.error('Błąd połączenia z WebSocket:', error);
    });
  }

  sendMessage(content: string) {
    console.log('Wysyłanie wiadomości:', content);
    const message = { content, type: 'CHAT' };
    this.stompClient.send('/sendMessage', {}, JSON.stringify(message));
  }

  adminReply(content: string) {
    console.log('Wysyłanie odpowiedzi admina:', content);
    const message = { content, type: 'CHAT' };
    this.stompClient.send('/adminReply', {}, JSON.stringify(message));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
