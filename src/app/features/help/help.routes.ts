import { Routes } from '@angular/router';

export const HELP_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/help-center/help-center.component').then(m => m.HelpCenterComponent) },
  { path: 'article/:slug', loadComponent: () => import('./pages/article-detail/article-detail.component').then(m => m.ArticleDetailComponent) },
  { path: 'support', loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent) }
];
