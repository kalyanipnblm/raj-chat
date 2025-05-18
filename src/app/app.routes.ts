import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ChatComponent }     from './pages/chat/chat.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },

  { path: 'welcome', component: WelcomeComponent },
  { path: 'chat',    component: ChatComponent },

  // catch-all fallback (optional)
  { path: '**', redirectTo: 'welcome' },
];