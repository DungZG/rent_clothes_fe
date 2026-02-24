import { Injectable, signal, computed } from '@angular/core';
import { AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<AuthUser | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUser();
    if (!user) return false;
    return roles.some(role => user.roles.includes(role));
  }

  login(token: string, user: AuthUser): void {
    localStorage.setItem('access_token', token);
    this.currentUser.set(user);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
  }
}
