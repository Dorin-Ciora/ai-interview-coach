import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../../core/supabase/services/supabase.service';
import { InterviewMessage } from '../shared/model/interview-message.model';
import { Interview } from '../shared/model/interview.model';

@Injectable({
  providedIn: 'root',
})
export class AiInterviewService {
  private readonly supabase = inject(SupabaseService).client;

  async generateNextQuestion(input: {
    interview: Interview;
    messages: InterviewMessage[];
  }): Promise<{ message: string }> {
    const { data, error } = await this.supabase.functions.invoke('generate-next-question', {
      body: {
        interviewId: input.interview.id,
        interview: {
          role: input.interview.role,
          seniority: input.interview.seniority,
          interviewType: input.interview.interview_type,
        },
        messages: input.messages.map((message) => ({
          sender: message.sender,
          messageText: message.message_text,
        })),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
