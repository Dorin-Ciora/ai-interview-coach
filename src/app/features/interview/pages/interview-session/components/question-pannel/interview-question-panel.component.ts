import { Component, Input } from '@angular/core';
import { InterviewMessage } from '../../../../shared/model/interview-message.model';
import { InterviewRoleLabelPipe } from '../../../../shared/pipes/role.pipe';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar'

@Component({
  selector: 'app-interview-question-panel',
  standalone: true,
  imports: [InterviewRoleLabelPipe, AvatarModule, ProgressBarModule],
  styleUrls: ['./interview-question-panel.component.scss'],
  templateUrl: './interview-question-panel.component.html',
})
export class InterviewQuestionPanelComponent {
  @Input({ required: true }) messages: InterviewMessage[] = [];
}
