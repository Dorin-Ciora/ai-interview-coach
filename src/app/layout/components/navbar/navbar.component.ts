import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthStore } from '../../../core/auth/store/auth.store';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NotificationService } from '../../../core/notification/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [RippleModule, ButtonModule, RouterModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  protected readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);

  async logOut(): Promise<void> {
    try {
      const { error } = await this.authService.signOut();

      if (error) {
        console.error('Logout error:', error.message);
        throw error;
      }

      await this.router.navigate(['/auth/login']);
      this.notification.success('Successfully logged out');
    } catch (error) {
      console.error('Unexpected logout error:', error);
    }
  }
}
