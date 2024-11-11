-- CreateTable
CREATE TABLE "ProjectClicks" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectClicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectClicks_projectId_key" ON "ProjectClicks"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectClicks" ADD CONSTRAINT "ProjectClicks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
