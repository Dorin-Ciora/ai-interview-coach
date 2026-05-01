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
          import('./pages/interview-setup/interview-setup.component').then(
            (m) => m.InterviewSetupComponent,
          ),
        title: 'Interview Setup',
      },
      {
        path: 'session/:id',
        loadComponent: () =>
          import('./pages/interview-session/shell/interview-session.component').then(
            (m) => m.InterviewSessionComponent,
          ),
        title: 'Interview Session',
      },
      {
        path: 'results',
        loadComponent: () =>
          import('./pages/interview-result/interview-result.component').then(
            (m) => m.InterviewResultComponent,
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
