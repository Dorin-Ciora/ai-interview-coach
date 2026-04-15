import { inject, Injectable } from '@angular/core';
import { Interview } from '../shared/model/interview.model';
import { AuthStore } from '../../../core/auth/store/auth.store';
import { SupabaseService } from '../../../core/supabase/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private readonly authStore = inject(AuthStore);
  private readonly supabase = inject(SupabaseService).client;

  async createInterview(input: {
    role: string;
    seniority: string;
    interviewType: Interview['interview_type'];
  }): Promise<Interview> {
    const user = this.authStore.user();

    if (!user) {
      throw new Error('User is not authenticated');
    }

    const { data, error } = await this.supabase
      .from('interviews')
      .insert({
        user_id: user.id,
        role: input.role,
        seniority: input.seniority,
        interview_type: input.interviewType,
        status: 'draft',
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getMyInterviews(): Promise<Interview[]> {
    const { data, error } = await this.supabase
      .from('interviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }

  async getInterviewById(interviewId: string): Promise<Interview> {
    const { data, error } = await this.supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateInterviewStatus(interviewId: string, status: Interview['status']): Promise<void> {
    const patch: Partial<Interview> = { status };

    if (status === 'in_progress') {
      patch.started_at = new Date().toISOString();
    }

    if (status === 'completed') {
      patch.finished_at = new Date().toISOString();
    }

    const { error } = await this.supabase.from('interviews').update(patch).eq('id', interviewId);

    if (error) {
      throw new Error(error.message);
    }
  }
}
