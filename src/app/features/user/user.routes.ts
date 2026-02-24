import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'edit-profile', loadComponent: () => import('./pages/edit-profile/edit-profile.component').then(m => m.EditProfileComponent) },
  { path: 'bookings', loadComponent: () => import('./pages/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent) },
  { path: 'payments', loadComponent: () => import('./pages/payment-history/payment-history.component').then(m => m.PaymentHistoryComponent) },
  { path: 'settings', loadComponent: () => import('./pages/account-settings/account-settings.component').then(m => m.AccountSettingsComponent) },
  { path: 'security', loadComponent: () => import('./pages/security/security.component').then(m => m.SecurityComponent) },
  { path: 'wallet', loadComponent: () => import('./pages/wallet/wallet.component').then(m => m.WalletComponent) },
  { path: 'schedule', loadComponent: () => import('./pages/schedule/schedule.component').then(m => m.ScheduleComponent) },
  { path: 'delete-account', loadComponent: () => import('./pages/delete-account/delete-account.component').then(m => m.DeleteAccountComponent) }
];
