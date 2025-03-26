export const ExtractImpFromResumePrompt = (resumeData: string) => {
  return `
You are an AI specialized in extracting key details from software developer resumes. Strictly return the response in **JSON format** with the following structure:

\`\`\`json
{
  "role": "<Primary role, specialization, or domain>",
  "skills": ["<List of relevant skills, technologies, and programming languages>"],
  "projects": [
    {
      "name": "<Project name>",
      "description": "<Brief project description>"
    }
  ]
}
\`\`\`

### **Instructions:**
- Extract only three details: **Role, Skills, and Projects**.
- Keep the response **concise and directly derived** from the resume.
- **Do not infer** information beyond what is explicitly mentioned.

**Resume Data:**  
${resumeData}
`;
};
export const ExtractQuestionsFromResumePrompt = (
  res: any,
  duration: string
) => {
  return `
    You are an AI specialized in creating ${duration} questions from the below information of software profile for interview. Strictly return the response in **JSON format** with the following structure stritly exact not other structure is not allowed:
    \`\`\`json
{
    "questions": [
            {
                "question": "What is ReactJS?"
            },
            {
                "question": "Describe your experience with NextJS?"
            }
}
\`\`\`
with questions as array of objects and objects having key ("question") and value . ( no other struture of JSON is not allowed )
        Role: ${res?.role}

        Skills: ${res?.skills.map((skill: any) => skill.name).join(", ")}

        Projects:
        ${res?.projects
          .map((project: any) => `- ${project.name}: ${project.description}`)
          .join("\n")}
    `.trim();
};
export const FeedbackPrompt = (formatData: string) => {
  return `
You are an **experienced technical recruiter**. Your task is to analyze the interview responses and provide structured feedback in **strict JSON format**.

### **Instructions for JSON Response:**
- **Return ONLY a valid JSON object. No extra text.**
- **Ensure the JSON follows this exact structure:**  

\`\`\`json
{
  "role": "technical_recruiter",
  "overallShortFeedback": "Brief but meaningful feedback on overall performance.",
  "inDepthFeedback": [
    {
      "question": "Exact question asked",
      "improvement": "Key areas where the response lacked depth, clarity, or correctness.",
      "suggestion": "Specific ways the candidate can improve their response."
    }
  ]
}
\`\`\`

### **Guidelines for Feedback:**
- Identify **strengths** and **weaknesses** in each answer.
- **Be constructive**: Instead of saying "poor answer," explain how it can be improved.
- **Use technical insights**: If a response lacks details about a framework, technology, or best practice, mention it.
- **Keep it structured and concise**: Avoid generic feedback like "needs improvement"; provide actionable advice.

### **Interview Responses for Analysis:**
${formatData}
  `;
};
