import { Routes } from '@angular/router';

export const IDENTITY_ROUTES: Routes = [
  { path: 'start', loadComponent: () => import('./pages/verification-start/verification-start.component').then(m => m.VerificationStartComponent) },
  { path: 'selfie', loadComponent: () => import('./pages/selfie-check/selfie-check.component').then(m => m.SelfieCheckComponent) },
  { path: 'status', loadComponent: () => import('./pages/verification-status/verification-status.component').then(m => m.VerificationStatusComponent) }
];
