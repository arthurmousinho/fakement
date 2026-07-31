/*
  Warnings:

  - You are about to drop the column `enabled` on the `webhook_endpoints` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `webhook_endpoints` DROP COLUMN `enabled`;
