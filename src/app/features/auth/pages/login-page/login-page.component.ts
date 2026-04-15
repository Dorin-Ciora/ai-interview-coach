import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../../core/notification/services/notification.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { ProfileService } from '../../../../core/profile/models/services/profile.service';

@Component({
  selector: 'app-login-page',
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
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
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

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  async submit() {
    this.isLoading.set(true);
    const email = this.email.value?.trim();
    const password = this.password.value;

    const { error, data } = await this.auth.signIn(email, password);

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
