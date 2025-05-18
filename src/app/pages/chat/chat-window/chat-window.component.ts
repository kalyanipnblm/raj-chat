import {
  Component,
  Input,
  AfterViewChecked,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Message {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements AfterViewChecked {
  @Input() messages: Message[] = [];
  @ViewChild('scrollContainer') private scroller!: ElementRef<HTMLDivElement>;

  ngAfterViewChecked() {
    // always run this after the view updates:
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const el = this.scroller.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
}
