import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ChatService, ChatResponse } from '../../services/chat.service';  // ← import ChatResponse

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: { role: 'user' | 'bot'; text: string }[] = [];
  userInput = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const userMessage = params['message'];
      if (userMessage) {
        this.messages.push({ role: 'user', text: userMessage });
        this.getBotReply(userMessage);
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

  getBotReply(userText: string) {
    this.chatService.sendMessage(userText)
      .subscribe((res: ChatResponse) => {    // now ChatResponse is recognized
        this.messages.push({ role: 'bot', text: res.reply });
      });
  }
}
