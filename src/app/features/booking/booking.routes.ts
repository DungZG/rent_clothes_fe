import { Routes } from '@angular/router';

export const BOOKING_ROUTES: Routes = [
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'confirmation/:id', loadComponent: () => import('./pages/confirmation/confirmation.component').then(m => m.ConfirmationComponent) },
  { path: 'cancel/:id', loadComponent: () => import('./pages/cancellation/cancellation.component').then(m => m.CancellationComponent) },
  { path: 'reschedule/:id', loadComponent: () => import('./pages/reschedule/reschedule.component').then(m => m.RescheduleComponent) }
];
