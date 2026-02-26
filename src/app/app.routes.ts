import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  // ===== PUBLIC (Main Layout) =====
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
      },
      {
        path: 'costumes',
        loadChildren: () =>
          import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./features/blog/blog.routes').then((m) => m.BLOG_ROUTES),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./features/staff/staff.routes').then((m) => m.STAFF_ROUTES),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./features/help/help.routes').then((m) => m.HELP_ROUTES),
      },
      {
        path: 'community',
        loadChildren: () =>
          import('./features/community/community.routes').then(
            (m) => m.COMMUNITY_ROUTES
          ),
      },
      // Authenticated but using Main Layout
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/user/user.routes').then((m) => m.USER_ROUTES),
      },
      {
        path: 'booking',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/booking/booking.routes').then(
            (m) => m.BOOKING_ROUTES
          ),
      },
      {
        path: 'messages',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/messaging/messaging.routes').then(
            (m) => m.MESSAGING_ROUTES
          ),
      },
      {
        path: 'wishlist',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/wishlist/wishlist.routes').then(
            (m) => m.WISHLIST_ROUTES
          ),
      },
      {
        path: 'review',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/review/review.routes').then((m) => m.REVIEW_ROUTES),
      },
      {
        path: 'notifications',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/notification/notification.routes').then(
            (m) => m.NOTIFICATION_ROUTES
          ),
      },
      {
        path: 'identity',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/identity/identity.routes').then(
            (m) => m.IDENTITY_ROUTES
          ),
      },
    ]
  },

  // ===== AUTH (Auth Layout) =====
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // ===== ONBOARDING (Blank Layout) =====
  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes').then(
        (m) => m.ONBOARDING_ROUTES
      ),
  },

  // ===== SHOP OWNER (Dashboard Layout) =====
  {
    path: 'shop',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['shop_owner'] },
    loadChildren: () =>
      import('./features/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },

  // ===== ADMIN (Admin Layout) =====
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // ===== FALLBACK =====
  { path: '**', redirectTo: '' },
];
