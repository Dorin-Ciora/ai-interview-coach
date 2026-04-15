export type InterviewType = 'technical' | 'hr' | 'behavioral' | 'mixed';
export type InterviewStatus = 'draft' | 'in_progress' | 'completed';

export interface Interview {
  id: string;
  user_id: string;
  role: string;
  seniority: string;
  interview_type: InterviewType;
  status: InterviewStatus;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
}
