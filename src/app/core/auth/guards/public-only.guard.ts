import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const publicOnlyGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const isLoggedIn = authStore.isLoggedIn();
  console.log('isLoggedIn guard', isLoggedIn);

  if (isLoggedIn) {
    return router.createUrlTree(['/interview/setup']);
  }

  return true;
};
