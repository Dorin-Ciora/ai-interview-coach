import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/guards/auth.guard';

export const INTERVIEW_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'setup',
        loadComponent: () =>
          import('./setup/pages/interview-setup-page/interview-setup-page.component').then(
            (m) => m.InterviewSetupPageComponent,
          ),
        title: 'Interview Setup',
      },
      {
        path: 'session',
        loadComponent: () =>
          import('./session/pages/interview-session-page/interview-session-page.component').then(
            (m) => m.InterviewSessionPageComponent,
          ),
        title: 'Interview Session',
      },
      {
        path: 'results',
        loadComponent: () =>
          import('./results/pages/interview-result-page/interview-result-page.component').then(
            (m) => m.InterviewResultPageComponent,
          ),
        title: 'Interview Results',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'setup',
      },
    ],
  },
];
