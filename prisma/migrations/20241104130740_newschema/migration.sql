-- CreateTable
CREATE TABLE "UserInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_email_key" ON "UserInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_username_key" ON "UserInfo"("username");
