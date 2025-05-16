import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  customInput: string = '';

  constructor(private router: Router) {}

  goToChat(prompt: string) {
    if (!prompt.trim()) return;
    this.router.navigate(['/chat'], {
      queryParams: { message: prompt }
    });
  }
}