// interview-role.options.ts
export const INTERVIEW_ROLE_OPTIONS = [
  { label: 'Frontend Developer', value: 'frontend_dev' },
  { label: 'Backend Developer', value: 'backend_dev' },
  { label: 'Fullstack Developer', value: 'fullstack_dev' },
] as const;

export type InterviewRoleValue = (typeof INTERVIEW_ROLE_OPTIONS)[number]['value'];

export function getInterviewRoleLabel(value: string): string {
  return INTERVIEW_ROLE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
