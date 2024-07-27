/*
  Warnings:

  - You are about to drop the `TextFunctionDefinition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TextFunctionDefinition" DROP CONSTRAINT "TextFunctionDefinition_user_id_fkey";

-- DropTable
DROP TABLE "TextFunctionDefinition";

-- CreateTable
CREATE TABLE "text_function_definitions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "text_function_definitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "text_function_definitions" ADD CONSTRAINT "text_function_definitions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
