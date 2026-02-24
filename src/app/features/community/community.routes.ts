import { Routes } from '@angular/router';

export const COMMUNITY_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/feed/feed.component').then(m => m.FeedComponent) },
  { path: 'leaderboard', loadComponent: () => import('./pages/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent) }
];
