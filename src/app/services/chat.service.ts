import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
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
      _this.stompClient.subscribe('/topic/messages', function (message: any) {
        _this.messageSubject.next(JSON.parse(message.body));
      });
    });
  }

  sendMessage(content: string) {
    const message = { content, type: 'CHAT' };
    this.stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
  }

  adminReply(content: string) {
    const message = { content, type: 'REPLY' };
    this.stompClient.send('/app/adminReply', {}, JSON.stringify(message));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
