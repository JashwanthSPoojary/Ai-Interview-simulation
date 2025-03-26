-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "candidateId" TEXT NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
