export type MessageSender = 'ai' | 'user';

export interface InterviewMessage {
  id: string;
  interview_id: string;
  sender: MessageSender;
  message_text: string;
  sequence_no: number;
  created_at: string;
}
