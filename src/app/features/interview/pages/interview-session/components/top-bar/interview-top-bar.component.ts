import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-interview-top-bar',
  templateUrl: './interview-top-bar.component.html',
  styleUrls: ['./interview-top-bar.component.scss'],
  imports: [TagModule, ButtonModule]
})
export class InterviewTopBarComponent {
  @Input() vm!: {
    interview: {
      role: string;
      seniority: string;
      interviewType: string;
    };
    timer?: string;
  };
}