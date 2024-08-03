/*
  Warnings:

  - You are about to drop the column `owner_user_id` on the `projects` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectUserRole" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_user_id_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "owner_user_id";

-- CreateTable
CREATE TABLE "project_members" (
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "role" "ProjectUserRole" NOT NULL,

    CONSTRAINT "project_members_pkey" PRIMARY KEY ("user_id","project_id")
);

-- CreateTable
CREATE TABLE "monthly_project_allocations" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "year_month" TIMESTAMP(3) NOT NULL,
    "allocated_hours" INTEGER NOT NULL,

    CONSTRAINT "monthly_project_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monthly_project_allocations_project_id_user_id_year_month_key" ON "monthly_project_allocations"("project_id", "user_id", "year_month");

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_project_allocations" ADD CONSTRAINT "monthly_project_allocations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_project_allocations" ADD CONSTRAINT "monthly_project_allocations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
