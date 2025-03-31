import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    try {
        const res = await prisma.project.delete({
            where:{
                id
            }
            ,select:{
                id:true
            }
        });
        return NextResponse.json({message:"Project deleted successfully",deletedProjectId:res},{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Failed to delete project"},{status:500});
    }
};
export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    const { id } = await params;
    const { name , description } = await request.json();
    try {
        const res = await prisma.project.update({
            where:{
                id
            },
            data:{
                name,
                description
            },
            select:{
                name:true,
                description:true
            }
        });
        return NextResponse.json({message:"Project updated successfully",updatedProject:res},{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Failed to update project"},{status:500});
    }
};
export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    const { name,description } = await request.json();
    const { id } = await params;
    try {
        const res = await prisma.project.create({
            data:{
                name,
                description,
                developerId:id
            }
        });
        return NextResponse.json({message:"added a project",newProject:res},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Failed to add a project"},{status:500});
    }
}