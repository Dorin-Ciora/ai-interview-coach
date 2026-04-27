export interface GenerateNextQuestionPayload {
  interviewId: string;
  messages: {
    sender: 'ai' | 'user';
    messageText: string;
  }[];
}

export interface GenerateNextQuestionResponse {
  message: string;
}
