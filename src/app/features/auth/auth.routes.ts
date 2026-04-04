import { Routes } from '@angular/router';
import { publicOnlyGuard } from '../../core/auth/guards/public-only.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [publicOnlyGuard],
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'signup',
    canActivate: [publicOnlyGuard],
    loadComponent: () =>
      import('./pages/signup-page/singup-page.component').then((m) => m.SignUpPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
