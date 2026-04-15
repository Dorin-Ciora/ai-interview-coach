import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProfileService } from '../../../../core/profile/models/services/profile.service';
import { NotificationService } from '../../../../core/notification/services/notification.service';

@Component({
  selector: 'app-signup-page',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    FloatLabelModule,
    MessageModule,
  ],
  templateUrl: './singup-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {
  private readonly auth = inject(AuthService);
  private readonly profile = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly notification = inject(NotificationService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  isLoading = signal(false);

  error = signal<string | null>(null);

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  async submit() {
    this.isLoading.set(true);
    this.error.set(null);
    const email = this.email.value.trim();
    const password = this.password.value;

    const { error, data } = await this.auth.signUp(email, password);

    this.isLoading.set(false);

    if (error) {
      this.notification.error(error.message);
      return;
    }

    if (data.user) {
      await this.profile.ensureProfile(data.user);
    }

    this.router.navigateByUrl('/interview/setup');
  }
}
