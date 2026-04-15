import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { InterviewType } from '../../shared/model/interview.model';
import { InterviewService } from '../../data-access/interview.service';
import { InterviewMessageService } from '../../data-access/interview-message.service';

@Component({
  selector: 'app-interview-setup',
  templateUrl: 'interview-setup.component.html',
  imports: [
    ButtonModule,
    CardModule,
    StepperModule,
    ToggleButtonModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MessageModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewSetupComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly interviewService = inject(InterviewService);
  private readonly interviewMessageService = inject(InterviewMessageService);

  form = this.fb.nonNullable.group({
    role: ['', [Validators.required, Validators.maxLength(25)]],
    seniority: ['', Validators.required],
    interviewType: ['technical' as InterviewType, Validators.required],
  });
  isSubmiting = signal(false);
  errorMsg = '';

  get role() {
    return this.form.controls.role;
  }
  get seniority() {
    return this.form.controls.seniority;
  }
  get interviewType() {
    return this.form.controls.interviewType;
  }

  activeStep: number = 1;
  roleOptions = [
    { label: 'Frontend Developer', value: 'frontend_dev' },
    { label: 'Backend Developer', value: 'backend_dev' },
    { label: 'DevOps Developer', value: 'devops_dev' },
  ];
  seniorityOptions = [
    { label: 'Junior', value: 'junior' },
    { label: 'Mid', value: 'mid' },
    { label: 'Senior', value: 'senior' },
  ];
  typeOptions = [
    { label: 'Tehnical', value: 'technical' },
    { label: 'HR', value: 'hr' },
    { label: 'Behavioral', value: 'behavioral' },
    { label: 'Mixed', value: 'mixed' },
  ];

  async startInterview(): Promise<void> {
    this.isSubmiting.set(true);
    this.errorMsg = '';

    try {
      const { role, seniority, interviewType } = this.form.getRawValue();
      console.log('role', role);
      const interview = await this.interviewService.createInterview({
        role,
        seniority,
        interviewType,
      });
      console.log('interview', interview);

      await this.interviewService.updateInterviewStatus(interview.id, 'in_progress');

      const firstQuestion = this.buildFirstQuestion(role, seniority, interviewType);
      console.log('firstQuestion', firstQuestion);
      await this.interviewMessageService.addMessage({
        interviewId: interview.id,
        sender: 'ai',
        messageText: firstQuestion,
        sequenceNr: 1,
      });

      await this.router.navigate(['/interview/session', interview.id]);
    } catch (error) {
      console.log('error', error);
      this.errorMsg = error instanceof Error ? error.message : 'Failed to start interview';
    } finally {
      this.isSubmiting.set(false);
    }
  }

  private buildFirstQuestion(
    role: string,
    seniority: string,
    interviewType: InterviewType,
  ): string {
    switch (interviewType) {
      case 'technical':
        return `Let's start your ${seniority} ${role} technical interview. Tell me about yourself and then explain one technically challenging problem you solved recently.`;
      case 'hr':
        return `Let's start your ${seniority} ${role} HR interview. Tell me about yourself and why you are interested in this kind of role.`;
      case 'behavioral':
        return `Let's start your ${seniority} ${role} behavioral interview. Tell me about a difficult situation at work and how you handled it.`;
      case 'mixed':
        return `Let's start your ${seniority} ${role} mixed interview. First, introduce yourself briefly, then tell me about one recent project you are proud of.`;
      default:
        return `Welcome to your interview. Tell me about yourself.`;
    }
  }
}
