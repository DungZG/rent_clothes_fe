import { Routes } from '@angular/router';

export const STAFF_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/staff-listing/staff-listing.component').then(m => m.StaffListingComponent) },
  { path: ':id', loadComponent: () => import('./pages/staff-profile/staff-profile.component').then(m => m.StaffProfileComponent) }
];
