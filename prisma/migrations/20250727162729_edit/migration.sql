/*
  Warnings:

  - You are about to drop the `ProjectPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectPlan" DROP CONSTRAINT "ProjectPlan_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "expectedOutcome" TEXT,
ADD COLUMN     "objective" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "stakeholders" TEXT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "ProjectPlan";
