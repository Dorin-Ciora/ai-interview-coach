import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type NotifyLevel = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  messageService = inject(MessageService);

  notify(level: NotifyLevel, detail: string, summary: string, position = 'bl', expire = 3000) {
    this.messageService.add({
      severity: level,
      summary,
      detail,
      key: position,
      life: expire,
    });
  }

  success(detail: string, summary = 'Success', position = 'bl', lifeMs = 3000) {
    this.notify('success', detail, summary, position, lifeMs);
  }

  info(detail: string, summary = 'Info', position = 'bl', lifeMs = 3000) {
    this.notify('info', detail, summary, position, lifeMs);
  }

  warn(detail: string, summary = 'Warning', position = 'bl', lifeMs = 3500) {
    this.notify('warn', detail, summary, position, lifeMs);
  }

  error(detail: string, summary = 'Error', position = 'bl', lifeMs = 4500) {
    this.notify('error', detail, summary, position, lifeMs);
  }

  clear(key?: string) {
    this.messageService.clear(key);
  }
}
