import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../../supabase/services/supabase.service';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data, error } = await supabase.client.auth.getSession();

  if (error) return router.parseUrl('/auth/login');

  if (data.session) return true;

  return router.parseUrl('/auth/login');
};
