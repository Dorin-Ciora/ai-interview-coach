import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../data-access/interview.service';
import { InterviewMessageService } from '../../data-access/interview-message.service';
import { Interview } from '../../shared/model/interview.model';
import { InterviewMessage } from '../../shared/model/interview-message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview-session',
  templateUrl: 'interview-session.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewSessionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly interviewService = inject(InterviewService);
  private readonly interviewMessageService = inject(InterviewMessageService);

  interview: Interview | null = null;
  messages: InterviewMessage[] = [];
  isLoading = signal(true);
  errorMessage = '';

  ngOnInit() {
    this.loadInterview();
  }

  private async loadInterview(): Promise<void> {
    const interviewId = this.route.snapshot.paramMap.get('id');

    if (!interviewId) {
      this.isLoading.set(false);
      this.errorMessage = 'Missing interview id.';
      return;
    }

    try {
      this.interview = await this.interviewService.getInterviewById(interviewId);
      this.messages = await this.interviewMessageService.getMessages(interviewId);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Failed to load interview.';
    } finally {
      this.isLoading.set(false);
    }
  }
}
