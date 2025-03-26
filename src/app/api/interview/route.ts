import { NextRequest, NextResponse } from "next/server";
import { fetchDeveloperData, saveInterviewSessionAndDeleteDeveloper } from "@/lib/prismaService";
import { generateInterviewQuestions } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  const { duration, id } = await request.json();  
  try {
    const developerData = await fetchDeveloperData(id);
    if (!developerData) {
      return NextResponse.json(
        { message: "Developer not found" },
        { status: 404 }
      );
    }
    const parsedData = await generateInterviewQuestions(developerData, duration);
    if (!parsedData || !parsedData.questions) {
      return NextResponse.json(
        { message: "Failed to generate interview questions" },
        { status: 500 }
      );
    }
    const interviewSession = await saveInterviewSessionAndDeleteDeveloper(id, duration, parsedData.questions);
    return NextResponse.json(
      { message: "Created an interview session", session: interviewSession.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating interview session:", error);
    return NextResponse.json(
      { message: "Failed to create an interview session" },
      { status: 500 }
    );
  }
}
