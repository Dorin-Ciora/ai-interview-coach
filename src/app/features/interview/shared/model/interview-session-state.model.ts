import { InterviewMessage } from './interview-message.model';
import { Interview } from './interview.model';

export interface InterviewSessionState {
  interview: Interview | null;
  interviewId: string | null;
  messages: InterviewMessage[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}
