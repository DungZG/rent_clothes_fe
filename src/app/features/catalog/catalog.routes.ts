import { Routes } from '@angular/router';

export const CATALOG_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/listing/listing.component').then(m => m.ListingComponent) },
  { path: 'search', loadComponent: () => import('./pages/search-results/search-results.component').then(m => m.SearchResultsComponent) },
  { path: ':id', loadComponent: () => import('./pages/costume-detail/costume-detail.component').then(m => m.CostumeDetailComponent) },
  { path: 'store/:id', loadComponent: () => import('./pages/store-profile/store-profile.component').then(m => m.StoreProfileComponent) }
];
