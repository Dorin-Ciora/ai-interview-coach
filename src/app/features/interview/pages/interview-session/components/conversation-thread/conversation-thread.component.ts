import { Component, Input } from '@angular/core';
import { InterviewMessage } from '../../../../shared/model/interview-message.model';
import { InterviewRoleLabelPipe } from '../../../../shared/pipes/role.pipe';

@Component({
  selector: 'app-conversation-thread',
  standalone: true,
  imports: [InterviewRoleLabelPipe],
  template: `
    <div class="thread">
      @for (message of messages; track message.id) {
        <div
          class="message"
          [class.ai]="message.sender === 'ai'"
          [class.user]="message.sender === 'user'"
        >
          <strong>{{ message.sender === 'ai' ? 'AI' : 'You' }}</strong>
          <p>{{ message.message_text | rolePipe }}</p>
        </div>
      }
    </div>
  `,
})
export class ConversationThreadComponent {
  @Input({ required: true }) messages: InterviewMessage[] = [];
}
