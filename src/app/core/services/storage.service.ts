import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  get(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  set(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch {}
  }

  remove(key: string): void {
    try { localStorage.removeItem(key); } catch {}
  }

  getJson<T>(key: string): T | null {
    const value = this.get(key);
    if (!value) return null;
    try { return JSON.parse(value); } catch { return null; }
  }

  setJson(key: string, value: unknown): void {
    this.set(key, JSON.stringify(value));
  }
}
