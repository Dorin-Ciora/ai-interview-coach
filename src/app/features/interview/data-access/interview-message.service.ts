import { inject, Injectable } from '@angular/core';
import { InterviewMessage } from '../shared/model/interview-message.model';
import { SupabaseService } from '../../../core/supabase/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewMessageService {
  private readonly supabase = inject(SupabaseService).client;

  async addMessage(input: {
    interviewId: string;
    sender: 'ai' | 'user';
    messageText: string;
    sequenceNr: number;
  }): Promise<InterviewMessage> {
    const { data, error } = await this.supabase
      .from('interview_messages')
      .insert({
        interview_id: input.interviewId,
        sender: input.sender,
        message_text: input.messageText,
        sequence_no: input.sequenceNr,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getMessages(interviewId: string): Promise<InterviewMessage[]> {
    const { data, error } = await this.supabase
      .from('interview_messages')
      .select('*')
      .eq('interview_id', interviewId)
      .order('sequence_no', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  }
}
