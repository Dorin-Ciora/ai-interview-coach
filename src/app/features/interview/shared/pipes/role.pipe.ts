import { Pipe, PipeTransform } from '@angular/core';
import { getInterviewRoleLabel } from '../utility/interview-role.options';

@Pipe({
  name: 'rolePipe',
  standalone: true,
})
export class InterviewRoleLabelPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return;

    return value.replace(/\bfrontend_dev|backend_dev|fullstack_dev\b/g, (match) =>
      getInterviewRoleLabel(match),
    );
  }
}
