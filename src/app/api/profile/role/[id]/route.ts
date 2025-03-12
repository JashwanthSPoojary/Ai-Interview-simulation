import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const {editedRole} = await request.json();
    const { id } = params;
    const res = await prisma.developer.update({
        where:{
            id:id
        },
        data:{
            role:editedRole
        },
        select:{
            role:true
        }
    });
    return NextResponse.json({ message: "Role updated successfully",editedRole:res.role });
}
