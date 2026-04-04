import { inject, Injectable, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  session = signal<Session | null>(null);
  user = signal<User | null>(null);
  initialized = signal(false);

  supabase = inject(SupabaseService);

  async init() {
    const { data } = await this.supabase.client.auth.getSession();
    this.session.set(data.session);
    this.user.set(data.session?.user ?? null);

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
    });

    this.initialized.set(true);
  }

  isLoggedIn(): boolean {
    return !!this.user();
  }
}
