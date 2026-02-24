import { Routes } from '@angular/router';

export const NOTIFICATION_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/notification-center/notification-center.component').then(m => m.NotificationCenterComponent) }
];
