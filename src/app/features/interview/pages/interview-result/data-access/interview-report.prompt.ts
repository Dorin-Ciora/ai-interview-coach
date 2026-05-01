export function buildFinalInterviewReportPrompt(input: {
  role: string;
  seniority: string;
  transcript: string;
}): string {
  return `
You are a senior technical interviewer preparing a final evaluation report.

Context:
- Role: ${input.role}
- Seniority: ${input.seniority}

Interview transcript:
${input.transcript}

Create a detailed final report using the exact structure below:

---

Overall Score: X / 10

Overall Summary:
(2-3 sentences summarizing performance and level)

---

Key Strengths:
- Bullet points

---

Key Weaknesses:
- Bullet points

---

Technical Readiness:
(Explain if the candidate is ready for this role and why)

---

Communication Evaluation:
(Assess clarity, structure, and depth of answers)

---

Recommended Focus Areas:
- 3 to 5 actionable topics

---

Final Verdict:
Choose ONE:
- Strong candidate
- Promising, but needs improvement
- Not ready yet

---

Rules:
- Be honest and realistic
- Do not be overly nice
- Do not be generic
- Base evaluation ONLY on the transcript
- Adjust expectations based on seniority
`.trim();
}