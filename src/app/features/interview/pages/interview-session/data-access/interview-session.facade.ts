import { computed, inject, Injectable, signal } from '@angular/core';
import { InterviewSessionState } from '../../../shared/model/interview-session-state.model';
import { InterviewMessageService } from '../../../data-access/interview-message.service';
import { InterviewFlowService } from '../../../data-access/interview-flow.service';
import { InterviewService } from '../../../data-access/interview.service';
import { Interview } from '../../../shared/model/interview.model';

@Injectable()
export class InterviewSessionFacade {
  private readonly state = signal<InterviewSessionState>({
    interviewId: null,
    messages: [],
    isLoading: false,
    isSubmitting: false,
    error: null,
    interview: null,
  });

  readonly messages = computed(() => this.state().messages);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly isSubmitting = computed(() => this.state().isSubmitting);
  readonly error = computed(() => this.state().error);

  interviewMsgService = inject(InterviewMessageService);
  interviewFlowService = inject(InterviewFlowService);
  interviewService = inject(InterviewService);

  async loadInterviewSession(interviewId: string): Promise<void> {
    this.state.update((state) => ({
      ...state,
      interviewId,
      isLoading: true,
      error: null,
    }));

    try {
      const [messages, interview] = await Promise.all([
        this.interviewMsgService.getMessages(interviewId),
        this.interviewService.getInterviewById(interviewId),
      ]);

      this.state.update((state) => ({
        ...state,
        messages,
        interview,
        isLoading: false,
      }));
    } catch (error) {
      this.state.update((state) => ({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load session',
      }));
    }
  }

  async submitAnswer(answer: string): Promise<void> {
    const trimmedAnswer = answer.trim();
    const currentState = this.state();

    if (!trimmedAnswer || !currentState.interviewId || currentState.isSubmitting) {
      return;
    }

    this.state.update((state) => ({
      ...state,
      isSubmitting: true,
      error: null,
    }));

    try {
      const updatedMessages = await this.interviewFlowService.submitAnswerAndGenerateNextQuestion({
        interview: currentState.interview as Interview,
        answer: trimmedAnswer,
        currentMessages: currentState.messages,
      });

      this.state.update((state) => ({
        ...state,
        messages: updatedMessages,
        isSubmitting: false,
      }));
    } catch (error) {
      this.state.update((state) => ({
        ...state,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'Failed to submit answer',
      }));
    }
  }
}
