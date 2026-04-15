// src/app/core/profile/profile.service.ts
import { inject, Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from '../../../supabase/services/supabase.service';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  target_role: string | null;
  seniority: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  supabase = inject(SupabaseService);

  async ensureProfile(user: User): Promise<void> {
    const payload: Partial<Profile> = {
      id: user.id,
      email: user.email ?? null,
    };

    const { error } = await this.supabase.client.from('profiles').upsert(payload);

    if (error) {
      throw new Error(error.message);
    }
  }

  async getMyProfile(): Promise<Profile | null> {
    const { data, error } = await this.supabase.client.from('profiles').select('*').maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateMyProfile(profile: Partial<Profile>): Promise<void> {
    const { error } = await this.supabase.client
      .from('profiles')
      .update(profile)
      .eq('id', profile.id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
