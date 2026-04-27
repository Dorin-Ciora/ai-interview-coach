import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interview } from '../../shared/model/interview.model';
import { InterviewMessage } from '../../shared/model/interview-message.model';
import { CommonModule } from '@angular/common';
import { InterviewSessionFacade } from './data-access/interview-session.facade';
import { AnswerBoxComponent } from './components/answer-box/answer-box.component';
import { ConversationThreadComponent } from './components/conversation-thread/conversation-thread.component';

@Component({
  selector: 'app-interview-session',
  templateUrl: 'interview-session.component.html',
  imports: [CommonModule, AnswerBoxComponent, ConversationThreadComponent],
  providers: [InterviewSessionFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewSessionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  public readonly facade = inject(InterviewSessionFacade);

  interview: Interview | null = null;
  messages: InterviewMessage[] = [];
  errorMessage = '';

  ngOnInit() {
    const interviewId = this.route.snapshot.paramMap.get('id');
    if (!interviewId) {
      return;
    }
    this.facade.loadInterviewSession(interviewId);
  }

  async onAnswerSubmit(answer: string): Promise<void> {
    await this.facade.submitAnswer(answer);
  }
}
