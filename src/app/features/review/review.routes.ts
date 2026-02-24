import { Routes } from '@angular/router';

export const REVIEW_ROUTES: Routes = [
  { path: ':bookingId', loadComponent: () => import('./pages/submit-review/submit-review.component').then(m => m.SubmitReviewComponent) }
];
