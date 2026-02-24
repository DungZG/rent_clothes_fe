import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent) },
  { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent) },
  { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
  { path: 'disputes', loadComponent: () => import('./pages/disputes/disputes.component').then(m => m.DisputesComponent) },
  { path: 'disputes/:id', loadComponent: () => import('./pages/dispute-detail/dispute-detail.component').then(m => m.DisputeDetailComponent) },
  { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog-management/blog-management.component').then(m => m.BlogManagementComponent) },
  { path: 'blog/new', loadComponent: () => import('./pages/blog-editor/blog-editor.component').then(m => m.BlogEditorComponent) },
  { path: 'blog/:id/history', loadComponent: () => import('./pages/blog-history/blog-history.component').then(m => m.BlogHistoryComponent) },
  { path: 'comments', loadComponent: () => import('./pages/comments/comments.component').then(m => m.CommentsComponent) },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
];
