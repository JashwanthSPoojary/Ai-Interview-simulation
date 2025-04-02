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
You are an AI specialized in analyzing technical interview responses. The candidate had **only one minute** to read the question and type their answer. Keep this strict time constraint in mind when providing feedback—focus on clarity, correctness, and conciseness rather than expecting long or highly detailed answers.

### **Instructions:**  
- **Provide constructive and precise feedback** on the candidate’s response.  
- **Keep the feedback fair**, considering the limited response time.  
- **Strictly return JSON format** as specified below.

\`\`\`json
{
  "role": "technical_recruiter",
  "overallShortFeedback": "A concise yet meaningful summary of the candidate’s overall performance.",
  "inDepthFeedback": [
    {
      "question": "The exact question asked in the interview.",
      "improvement": "Key areas where the response lacked depth, clarity, or correctness.",
      "suggestion": "Specific ways the candidate can improve their response."
    }
  ]
}
\`\`\`

### **Interview Data:**  
${formatData}
`;
};
