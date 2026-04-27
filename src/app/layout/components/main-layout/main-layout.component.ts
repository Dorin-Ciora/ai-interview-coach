import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navbar/navbar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavigationComponent, ToastModule],
  template: `<div class="layout-wrapper">
    <app-navbar />
    <main><p-toast position="bottom-left" key="bl" /><router-outlet /></main>
  </div>`,
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {}
