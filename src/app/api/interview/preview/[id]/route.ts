import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await prisma.developer.findUnique({
      where:{
        id
      },
      select:{
        id:true,
        role:true,
        skills:true,
        projects:true
    }
    })
    if (!res) {
      return NextResponse.json({ message: "Developer not found" }, { status: 404 });
    }
    return NextResponse.json({ ...res },{status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
