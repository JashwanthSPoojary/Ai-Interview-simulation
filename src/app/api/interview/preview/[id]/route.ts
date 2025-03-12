import { NextResponse } from "next/server";
import fs from "fs";
import pdfParse from "pdf-parse";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI("AIzaSyCYjNxmtTK6t8QgV_lFwfF_dnafz_Qpa_8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } =  params;
  try {
    const existingData = await prisma.developer.findFirst({
      where:{
        pdfname:id
      },
      select:{
        id:true,
        role:true,
        skills:true,
        projects:true
      }
    })
    if(existingData){
      return NextResponse.json({ ...existingData });
    }
    const filePath = path.join(process.cwd(), "public/uploads", id + "");
    const fileBuffer = await fs.promises.readFile(filePath);
    const resumeText = await pdfParse(Buffer.from(fileBuffer));
    const resumeData = resumeText.text;
    const systemPrompt = `
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
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: systemPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },
    });
    if (!result.response.candidates) return;
    const apiResponse = result.response.candidates[0].content.parts[0].text;
    if (!apiResponse) return;
    const jsonResponse = apiResponse
      .replace(/^```json\s*/, "")
      .replace(/\n?```[\r\n]*$/, "")
      .trim();
    const parsedData = JSON.parse(jsonResponse);
    const developer = await prisma.developer.create({
        data: {
          pdfname:id,
          role: parsedData.role,
          skills: {
            connectOrCreate: parsedData.skills.map((skillName: string) => ({
              where: { name: skillName },
              create: { name: skillName }
            }))
          },
          projects: {
            create: parsedData.projects.map((project: any) => ({
              name: project.name,
              description: project.description
            }))
          }
        },
        select:{
            id:true,
            role:true,
            skills:true,
            projects:true
        }
      });

    return NextResponse.json({ ...developer });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
