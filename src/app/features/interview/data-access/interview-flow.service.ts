import { Injectable } from '@angular/core';
import { InterviewMessageService } from './interview-message.service';
import { AiInterviewService } from './ai-interview.service';
import { InterviewMessage } from '../shared/model/interview-message.model';
import { Interview } from '../shared/model/interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewFlowService {
  constructor(
    private readonly interviewMessageService: InterviewMessageService,
    private readonly aiInterviewService: AiInterviewService,
  ) {}

  async submitAnswerAndGenerateNextQuestion(input: {
    interview: Interview;
    answer: string;
    currentMessages: InterviewMessage[];
  }): Promise<InterviewMessage[]> {
    const nextUserSequence = this.getNextSequenceNo(input.currentMessages);

    const userMessage = await this.interviewMessageService.addMessage({
      interviewId: input.interview.id,
      sender: 'user',
      messageText: input.answer,
      sequenceNr: nextUserSequence,
    });

    const updatedMessages = [...input.currentMessages, userMessage];

    const aiResponse = await this.aiInterviewService.generateNextQuestion({
      interview: input.interview,
      messages: updatedMessages,
    });

    const aiMessage = await this.interviewMessageService.addMessage({
      interviewId: input.interview.id,
      sender: 'ai',
      messageText: aiResponse.message,
      sequenceNr: nextUserSequence + 1,
    });

    return [...updatedMessages, aiMessage];
  }

  private getNextSequenceNo(messages: InterviewMessage[]): number {
    if (!messages.length) {
      return 1;
    }

    return Math.max(...messages.map((message) => message.sequence_no)) + 1;
  }
}
