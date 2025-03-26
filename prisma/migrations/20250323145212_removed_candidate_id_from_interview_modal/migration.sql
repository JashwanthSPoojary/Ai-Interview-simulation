/*
  Warnings:

  - You are about to drop the column `candidateId` on the `Interview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_candidateId_fkey";

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "candidateId";
