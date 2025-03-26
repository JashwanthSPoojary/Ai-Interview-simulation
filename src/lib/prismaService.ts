import { prisma } from "@/lib/prisma";

export async function saveDeveloper(parsedData: any) {
  return await prisma.developer.create({
    data: {
      role: parsedData.role,
      skills: {
        connectOrCreate: parsedData.skills.map((skillName: string) => ({
          where: { name: skillName },
          create: { name: skillName },
        })),
      },
      projects: {
        create: parsedData.projects.map((project: any) => ({
          name: project.name,
          description: project.description,
        })),
      },
    },
    select: { id: true },
  });
};
export async function fetchDeveloperData(id: any) {
  return await prisma.developer.findFirst({
    where: {
      id,
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
  })
}
export async function saveInterviewSessionAndDeleteDeveloper(id: string,duration:string,parsedData:any) {
  return await prisma.$transaction( async (tsx) => {
    const session = await tsx.interview.create({
      data:{
          duration:Number(duration),
          questions:{
              create:parsedData.map((question:any)=>({
                question:question.question
              }))
          }
      },
      select:{
        id:true
      }
    });
    await tsx.developer.delete({
      where:{
        id
      }
    });
    return session;
  })
}
export async function saveAnswersAndFetchQuestionsWithAnswer(id: string,answers:any) {
  return await prisma.$transaction( async (tsx) =>{
        await tsx.answer.createMany({
          data: answers.map(
            ({ questionId, answer }: { questionId: string; answer: string }) => ({
              questionId,
              answer,
              interviewId:id
            })
          ),
        });
        const questionWithAnswer = await tsx.interview.findUnique({
          where: { id },
          select: {
            questions: {
              select: {
                question: true,
                answers: {
                  select: { answer: true },
                  take: 1, // Ensures only one answer per question
                },
              },
            },
          },
        });
        return questionWithAnswer;
      })
}
export async function saveFeedback(data:any) {
  return await prisma.feedback.create({
    data: {
      role: data.role,
      overallShortFeedback: data.overallShortFeedback,
      inDepthFeedback: {
        createMany: {
          data: data.inDepthFeedback.map((feedback:any) => ({
            question: feedback.question,
            improvement: feedback.improvement,
            suggestion: feedback.suggestion,
          })),
        },
      },
    },
    include: { inDepthFeedback: true },
  });
}





