import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../navbar/navbar.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavigationComponent, ToastModule],
  template: ` <app-navbar />
    <main><p-toast position="bottom-left" key="bl" /><router-outlet /></main>`,
})
export class MainLayoutComponent {}
