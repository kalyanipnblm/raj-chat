import { Component, OnInit } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { FormsModule }     from '@angular/forms';
import { HttpClientModule }from '@angular/common/http';
import { ActivatedRoute }  from '@angular/router';    
import {
  ChatWindowComponent,
  Message
} from './chat-window/chat-window.component';
import { ChatService, ChatResponse } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ChatWindowComponent
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  userInput = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // 1) Load the last 5 turns from the backend
    this.chatService.getHistory().subscribe(history => {
      this.messages = history as Message[];
    });

    // 2) Then handle any ?message=… prompt
    this.route.queryParams.subscribe(params => {
      const prompt = params['message'];
      if (prompt) {
        this.messages.push({ role: 'user', text: prompt });
        this.getBotReply(prompt);
      }
    });
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;
    this.messages.push({ role: 'user', text });
    this.getBotReply(text);
    this.userInput = '';
  }

  private getBotReply(text: string) {
    this.chatService.sendMessage(text)
      .subscribe(res => {
        this.messages.push({ role: 'bot', text: res.reply });
      });
  }
}


