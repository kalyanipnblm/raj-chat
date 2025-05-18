import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';

export interface ChatRequest  { message: string; }
export interface ChatResponse { reply: string; }

@Injectable({ providedIn: 'root' })
export class ChatService {
  private base = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  sendMessage(text: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.base}/chat`, { message: text });
  }

  getHistory(): Observable<Array<{ role: 'user'|'bot'; text: string }>> {
    return this.http.get<Array<{ role: 'user'|'bot'; text: string }>>(
      `${this.base}/history`
    );
  }
}


