import { Routes } from '@angular/router';

export const WISHLIST_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/my-wishlist/my-wishlist.component').then(m => m.MyWishlistComponent) },
  { path: 'collections', loadComponent: () => import('./pages/manage-collections/manage-collections.component').then(m => m.ManageCollectionsComponent) },
  { path: 'collections/:id', loadComponent: () => import('./pages/collection-detail/collection-detail.component').then(m => m.CollectionDetailComponent) }
];
