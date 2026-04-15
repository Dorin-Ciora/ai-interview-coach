import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, ToastModule],
  template: `<app-main-layout />`,
  styleUrl: './app.scss',
})
export class App {}
