import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const developerId = searchParams.get("developerId");
  const sessionId = searchParams.get("sessionId");
  const feedbackId = searchParams.get("feedbackId");
  try {
    if (developerId) {
      const res = await prisma.developer.findUnique({
        where: {
          id: developerId,
        },
        select: {
          id: true,
        },
      });
      if (!res) {
        return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
      }
      return NextResponse.json({ res }, { status: 200 });
    }
    if (sessionId) {
      const res = await prisma.interview.findUnique({
        where: {
          id: sessionId,
        },
        select: {
          id: true,
        },
      });
      if (!res) {
        return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
      }
      return NextResponse.json({ res }, { status: 200 });
    }
    if(feedbackId){
      const res = await prisma.feedback.findUnique({
        where:{
          id:feedbackId
        },
        select: {
          id: true,
        },
      });
      if (!res) {
        return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
      }
      return NextResponse.json({ res }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to check . Backent is down . Fix asap" }, { status: 500 });
  }
}
