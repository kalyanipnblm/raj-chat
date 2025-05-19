import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';

import { environment } from '../../environments/environment';

export interface ChatRequest  { message: string; }
export interface ChatResponse { reply: string; }

@Injectable({ providedIn: 'root' })
export class ChatService {

  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  sendMessage(text: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(
      `${this.base}/chat`,
      { message: text }
    );
  }

  getHistory(): Observable<Array<{ role: 'user'|'bot'; text: string }>> {
    return this.http.get<Array<{ role: 'user'|'bot'; text: string }>>(
      `${this.base}/history`
    );
  }
}


