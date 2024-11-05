-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "link" TEXT,
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'unknown';
