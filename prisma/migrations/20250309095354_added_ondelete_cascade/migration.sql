-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_developerId_fkey";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
