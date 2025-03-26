/*
  Warnings:

  - A unique constraint covering the columns `[candidateId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interview_candidateId_key" ON "Interview"("candidateId");
