import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request:NextRequest,{params}:{params:Promise<{developerId:string}>}){
    const { developerId } = await params;
    const { searchParams } = new URL(request.url);
    const skillId = searchParams.get("skillId");
    if (!skillId || !developerId) {
        return NextResponse.json({message:"no skillId or developerId"},{status:400});
    }
    try {
        const developerWithSkill = await prisma.developer.count({
            where:{
                skills:{
                    some:{id:skillId}
                }
            }
        })
        if(developerWithSkill===1){
            await prisma.skill.delete({
                where:{
                    id:skillId
                }
            })
        }else{
            await prisma.developer.update({
                where:{
                    id:developerId
                },
                data:{
                    skills:{
                        disconnect:{
                            id:skillId
                        }
                    }
                }
            })
        }
        return NextResponse.json({message:"skill is deleted successfully"},{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Error while deleting the skill"},{status:500})
    }
}

export async function POST (request:NextRequest,{params}:{params:Promise<{developerId:string}>}){
    const { developerId } = await params;
    const {newSkill} = await request.json();
    if(!newSkill|| !developerId){
        return NextResponse.json({message:"no input or developerId"});
    } 
    try {
        const addedSkill = await prisma.$transaction( async (prisma)=>{
            await prisma.developer.update({
                where:{
                    id:developerId
                },
                data:{
                    skills:{
                        connectOrCreate:{
                            where:{
                                name:newSkill
                            },
                            create:{
                                name:newSkill
                            },

                        }
                    }
                }
            })
            const skill = await prisma.skill.findUnique({
                where:{
                    name:newSkill
                }
            })
            return skill
        });
        
        return NextResponse.json({message:"new skill added",addedSkill});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message:"failed to add new skill"},{status:500});
    }
};