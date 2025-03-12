import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCYjNxmtTK6t8QgV_lFwfF_dnafz_Qpa_8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function GET(
  request: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  const { interviewId } = params;
  try {
    const res = await prisma.developer.findUnique({
      where: {
        id: interviewId,
      },
      select: {
        role: true,
        skills: {
          select: {
            name: true,
          },
        },
        projects: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
    const formattedParagraph = `
    You are an AI specialized in creating questions from the below information of software profile for interview. Strictly return the response in **JSON format** with the following structure:
    \`\`\`json
{
  "what is react js ?",
  "what is version of tailwind css used in your food web project and what's difference with other version ?",
  "why did you use ws library instead of socket library ?"
}
\`\`\`
        Role: ${res?.role}

        Skills: ${res?.skills.map(skill => skill.name).join(", ")}

        Projects:
        ${res?.projects.map(project => `- ${project.name}: ${project.description}`).join("\n")}
    `.trim();

    const result = await model.generateContent({
        contents: [
            {
              role: "user",
              parts: [
                {
                  text: formattedParagraph,
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

    return NextResponse.json({ parsedData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
