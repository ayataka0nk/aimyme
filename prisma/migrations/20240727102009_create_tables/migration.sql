-- CreateTable
CREATE TABLE "text_function_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "text_function_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextFunctionDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "TextFunctionDefinition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "text_function_logs" ADD CONSTRAINT "text_function_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextFunctionDefinition" ADD CONSTRAINT "TextFunctionDefinition_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
