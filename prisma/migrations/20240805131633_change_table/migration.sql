/*
  Warnings:

  - Added the required column `description` to the `time_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_entries" ADD COLUMN     "description" TEXT NOT NULL;
