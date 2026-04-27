import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-answer-box',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  template: `
    <div class="answer-box">
      <textarea
        [ngModel]="answer()"
        (ngModelChange)="answer.set($event)"
        [disabled]="disabled"
        rows="6"
        placeholder="Write your answer here"
      >
      </textarea>

      <p-button
        label="Submit answer"
        severity="info"
        [disabled]="disabled || !answer().trim()"
        (onClick)="submit()"
      />
    </div>
  `,
})
export class AnswerBoxComponent {
  @Input() disabled = false;
  @Output() answerSubmit = new EventEmitter<string>();

  readonly answer = signal('');

  submit(): void {
    const value = this.answer().trim();

    if (!value) {
      return;
    }

    this.answerSubmit.emit(value);
    this.answer.set('');
  }
}
