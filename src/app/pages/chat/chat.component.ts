import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  messages = [
    { role: 'user', text: 'What are our brand strengths?' },
    { role: 'bot', text: 'Your top strengths are: creativity, consistency, and community.' },
    { role: 'user', text: 'Can you recommend a campaign idea?' },
    { role: 'bot', text: 'Sure! How about a "Design for Good" campaign highlighting your impact?' }
  ];
}
