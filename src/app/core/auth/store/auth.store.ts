import { computed, inject, Injectable, signal } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/services/supabase.service';
import { ProfileService } from '../../profile/models/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  session = signal<Session | null>(null);
  user = signal<User | null>(null);
  initialized = signal(false);
  isLoggedIn = computed(() => !!this.user());

  supabase = inject(SupabaseService);
  profile = inject(ProfileService);

  async init() {
    const { data } = await this.supabase.client.auth.getSession();

    this.session.set(data.session);
    this.user.set(data.session?.user ?? null);

    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);

      if (session?.user) {
        void this.profile.ensureProfile(session.user);
      }
    });

    if (data.session?.user) {
      void this.profile.ensureProfile(data.session.user);
    }

    this.initialized.set(true);
  }
}
