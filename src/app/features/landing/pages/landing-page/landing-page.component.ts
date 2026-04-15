import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [RippleModule, StyleClassModule, ButtonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LandingPageComponent {}
