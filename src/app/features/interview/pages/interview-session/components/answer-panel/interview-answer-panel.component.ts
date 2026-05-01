import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-interview-answer-panel',
  standalone: true,
  imports: [FormsModule, ButtonModule, NgClass],
  templateUrl: './interview-answer-panel.component.html',
  styleUrls: ['./interview-answer-panel.component.scss']
})
export class InnterviewAnswerPanelComponent {
  @Input() disabled = false;
  @Output() answerSubmit = new EventEmitter<string>();
  status = signal('')

  readonly answer = signal('');

  submit(): void {
    this.status.set('feedback')
    // const value = this.answer().trim();

    // if (!value) {
    //   return;
    // }

    // this.answerSubmit.emit(value);
    // this.answer.set('');
  }

  getScoreClass(score: number): string {
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
}
}
