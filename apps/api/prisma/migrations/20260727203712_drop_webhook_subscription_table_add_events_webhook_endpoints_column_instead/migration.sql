/*
  Warnings:

  - You are about to drop the `webhook_subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `event` to the `webhook_endpoints` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `webhook_subscriptions` DROP FOREIGN KEY `webhook_subscriptions_endpoint_id_fkey`;

-- AlterTable
ALTER TABLE `webhook_endpoints` ADD COLUMN `event` JSON NOT NULL;

-- DropTable
DROP TABLE `webhook_subscriptions`;
