import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const LANDING_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'how-it-works', loadComponent: () => import('./pages/how-it-works/how-it-works.component').then(m => m.HowItWorksComponent) },
  { path: 'become-host', loadComponent: () => import('./pages/become-host/become-host.component').then(m => m.BecomeHostComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'referral', loadComponent: () => import('./pages/referral/referral.component').then(m => m.ReferralComponent) },
  { path: 'gift-cards', loadComponent: () => import('./pages/gift-cards/gift-cards.component').then(m => m.GiftCardsComponent) },
];
