import { Injectable, input } from '@angular/core';
import { InterviewMessageService } from './interview-message.service';
import { AiInterviewService } from './ai-interview.service';
import { InterviewMessage } from '../shared/model/interview-message.model';
import { Interview } from '../shared/model/interview.model';
import { RouterLink } from '@angular/router';
import { buildInterviewCoachSystemPrompt } from '../pages/interview-session/data-access/interview-coach.prompt';
import { AiChatMessage } from '../shared/model/ai-chat.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewFlowService {
  MAX_CONTEXT_MESSAGES = 8;

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

    const messageForAi = this.buildMessageForAi({interview: input.interview, messages: updatedMessages})

    const aiResponse = await this.aiInterviewService.generateNextQuestion({
      interview: input.interview,
      messages: messageForAi,
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

  private buildMessageForAi(input: {
    interview: Interview;
    messages: InterviewMessage[]
  }): AiChatMessage[] {

  const recentMessages = input.messages.slice(this.MAX_CONTEXT_MESSAGES);

  return [
    {
      role: 'system',
      content: buildInterviewCoachSystemPrompt(input.interview),
    },
    ...recentMessages.map((mesages) => ({
      role: mesages.sender === 'ai' ? 'assistan' : 'user',
      content: mesages.message_text
    })),
  ]
  }
}
