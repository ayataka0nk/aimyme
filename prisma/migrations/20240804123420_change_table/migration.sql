/*
  Warnings:

  - You are about to drop the column `year_month` on the `monthly_project_allocations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_id,user_id,year,month]` on the table `monthly_project_allocations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `month` to the `monthly_project_allocations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `monthly_project_allocations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "monthly_project_allocations_project_id_user_id_year_month_key";

-- AlterTable
ALTER TABLE "monthly_project_allocations" DROP COLUMN "year_month",
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "monthly_project_allocations_project_id_user_id_year_month_key" ON "monthly_project_allocations"("project_id", "user_id", "year", "month");
