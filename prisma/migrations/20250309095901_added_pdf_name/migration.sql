/*
  Warnings:

  - Added the required column `pdfname` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Developer" ADD COLUMN     "pdfname" TEXT NOT NULL;
