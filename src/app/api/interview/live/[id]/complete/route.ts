import { NextRequest, NextResponse } from "next/server";
import { saveAnswersAndFetchQuestionsWithAnswer, saveFeedback } from "@/lib/prismaService";
import { formatQuestionWithAnswers } from "@/lib/formatInterviewResponse.";
import { generateInterviewFeedback } from "@/lib/aiService";

export async function POST(
  requset: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { answers } = await requset.json();
  try {
    const questionWithAnswer = await saveAnswersAndFetchQuestionsWithAnswer(id,answers);
    if(!questionWithAnswer) return NextResponse.json(
      { message: "Interview is not found" },
      { status: 404 }
    );
    const formattedText = formatQuestionWithAnswers(questionWithAnswer);
    const feedback = await generateInterviewFeedback(formattedText);
    const res = await saveFeedback(feedback);
    return NextResponse.json({ message:"was succesfull" , id:res.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Backend is down . will fix asap" },
      { status: 500 }
    );
  }
}
