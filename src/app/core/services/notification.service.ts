import { Injectable, signal } from '@angular/core';

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<AppNotification[]>([]);
  readonly items = this.notifications.asReadonly();

  success(message: string): void { this.show('success', message); }
  error(message: string): void { this.show('error', message); }
  warning(message: string): void { this.show('warning', message); }
  info(message: string): void { this.show('info', message); }

  private show(type: AppNotification['type'], message: string, duration = 3000): void {
    const id = crypto.randomUUID();
    this.notifications.update(items => [...items, { id, type, message, duration }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: string): void {
    this.notifications.update(items => items.filter(n => n.id !== id));
  }
}
