/*
  Warnings:

  - You are about to drop the column `in_progress_project_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_in_progress_project_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "in_progress_project_id",
ADD COLUMN     "in_progress_time_entry_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_in_progress_time_entry_id_fkey" FOREIGN KEY ("in_progress_time_entry_id") REFERENCES "time_entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
