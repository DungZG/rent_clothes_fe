import { Routes } from '@angular/router';

export const ONBOARDING_ROUTES: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadComponent: () => import('./pages/welcome/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'personalize', loadComponent: () => import('./pages/personalize/personalize.component').then(m => m.PersonalizeComponent) },
  { path: 'ready', loadComponent: () => import('./pages/ready/ready.component').then(m => m.ReadyComponent) }
];
