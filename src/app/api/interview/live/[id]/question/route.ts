import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(requset:NextRequest,{params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    try {
      const res = await prisma.interview.findFirst({
        where:{
          id
        },
        select:{
          questions:{
            select:{
              id:true,
              question:true
            }
          }
        }
      });
      if(!res){
        return NextResponse.json({message:"Invalid URL"},{status:500})
      }
      return NextResponse.json({question:res?.questions},{status:200});
    } catch (error) {
      return NextResponse.json({message:"Backend is down . will fix asap"},{status:500})
    }
}