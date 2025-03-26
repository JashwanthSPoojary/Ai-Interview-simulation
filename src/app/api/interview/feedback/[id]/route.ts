import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await prisma.feedback.findUnique({
      where: {
        id,
      },
      select: {
        role: true,
        overallShortFeedback: true,
        inDepthFeedback: {
          select: {
            question: true,
            improvement: true,
            suggestion: true,
          },
        },
      },
    });
    if (!res) {
      return NextResponse.json(
        { message: "Developer not found" },
        { status: 404 }
      );
    }
    console.log("the data is : ", res);
    
    return NextResponse.json({ data:res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
