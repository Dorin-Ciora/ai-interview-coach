import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InterviewQuestionPanelComponent } from '../components/question-pannel/interview-question-panel.component';
import { InnterviewAnswerPanelComponent } from '../components/answer-panel/interview-answer-panel.component';
import { InterviewSessionFacade } from '../data-access/interview-session.facade';
import { Interview } from '../../../shared/model/interview.model';
import { InterviewMessage } from '../../../shared/model/interview-message.model';
import { InterviewTopBarComponent } from '../components/top-bar/interview-top-bar.component';

@Component({
  selector: 'app-interview-session',
  templateUrl: 'interview-session.component.html',
  styleUrls: ['./interview-session.component.scss'],
  imports: [CommonModule, InnterviewAnswerPanelComponent, InterviewQuestionPanelComponent, InterviewTopBarComponent],
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
