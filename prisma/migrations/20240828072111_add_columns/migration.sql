-- AlterTable
ALTER TABLE "users" ADD COLUMN     "in_progress_project_id" TEXT,
ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_in_progress_project_id_fkey" FOREIGN KEY ("in_progress_project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
