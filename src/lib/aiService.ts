import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExtractImpFromResumePrompt, ExtractQuestionsFromResumePrompt, FeedbackPrompt } from "@/lib/prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeResume(resumeText: string) {
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: ExtractImpFromResumePrompt(resumeText) }] }],
    generationConfig: { maxOutputTokens: 1000, temperature: 0.1 },
  });

  if (!result.response.candidates) return null;
  
  const apiResponse = result.response.candidates[0].content.parts[0].text;
  if (!apiResponse) return null;

  return JSON.parse(apiResponse.replace(/^```json\s*/, "").replace(/\n?```[\r\n]*$/, "").trim());
}

export async function generateInterviewQuestions(developerData: any,duration:any) {
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: ExtractQuestionsFromResumePrompt(developerData,duration) }] }],
    generationConfig: { maxOutputTokens: 1000, temperature: 0.1 },
  });

  if (!result.response.candidates) return null;
  
  const apiResponse = result.response.candidates[0].content.parts[0].text;
  if (!apiResponse) return null;

  return JSON.parse(apiResponse.replace(/^```json\s*/, "").replace(/\n?```[\r\n]*$/, "").trim());
}
export async function generateInterviewFeedback(formatData:string) {
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: FeedbackPrompt(formatData) }] }],
    generationConfig: { maxOutputTokens: 1000, temperature: 0.1 },
  });

  if (!result.response.candidates) return null;
  
  const apiResponse = result.response.candidates[0].content.parts[0].text;
  if (!apiResponse) return null;

  return JSON.parse(apiResponse.replace(/^```json\s*/, "").replace(/\n?```[\r\n]*$/, "").trim());
  // return apiResponse;
}


