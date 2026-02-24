import { Routes } from '@angular/router';

export const MESSAGING_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/inbox/inbox.component').then(m => m.InboxComponent) },
  { path: ':id', loadComponent: () => import('./pages/conversation/conversation.component').then(m => m.ConversationComponent) }
];
