import { Routes } from '@angular/router';

export const SHOP_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
  { path: 'add-costume', loadComponent: () => import('./pages/add-costume/add-costume.component').then(m => m.AddCostumeComponent) },
  { path: 'analytics', loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent) },
  { path: 'marketing', loadComponent: () => import('./pages/marketing/marketing.component').then(m => m.MarketingComponent) },
  { path: 'market-trends', loadComponent: () => import('./pages/market-trends/market-trends.component').then(m => m.MarketTrendsComponent) },
  { path: 'reviews', loadComponent: () => import('./pages/reviews/reviews.component').then(m => m.ReviewsComponent) },
  { path: 'policies', loadComponent: () => import('./pages/policies/policies.component').then(m => m.PoliciesComponent) },
  { path: 'wallet', loadComponent: () => import('./pages/wallet/wallet.component').then(m => m.WalletComponent) },
  { path: 'notifications', loadComponent: () => import('./pages/notifications-settings/notifications-settings.component').then(m => m.NotificationsSettingsComponent) },
  { path: 'discounts', loadComponent: () => import('./pages/discounts/discounts.component').then(m => m.DiscountsComponent) },
  { path: 'maintenance', loadComponent: () => import('./pages/maintenance/maintenance.component').then(m => m.MaintenanceComponent) },
  { path: 'bookings', loadComponent: () => import('./pages/bookings/bookings.component').then(m => m.BookingsComponent) },
];
