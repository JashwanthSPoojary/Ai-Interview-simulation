/*
  Warnings:

  - The primary key for the `Developer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_DeveloperToSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_developerId_fkey";

-- DropForeignKey
ALTER TABLE "_DeveloperToSkill" DROP CONSTRAINT "_DeveloperToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_DeveloperToSkill" DROP CONSTRAINT "_DeveloperToSkill_B_fkey";

-- AlterTable
ALTER TABLE "Developer" DROP CONSTRAINT "Developer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Developer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Developer_id_seq";

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "developerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq";

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Skill_id_seq";

-- AlterTable
ALTER TABLE "_DeveloperToSkill" DROP CONSTRAINT "_DeveloperToSkill_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_DeveloperToSkill_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToSkill" ADD CONSTRAINT "_DeveloperToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperToSkill" ADD CONSTRAINT "_DeveloperToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
