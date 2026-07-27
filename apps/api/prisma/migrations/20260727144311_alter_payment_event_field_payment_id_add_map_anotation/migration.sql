/*
  Warnings:

  - You are about to drop the column `paymentId` on the `payment_events` table. All the data in the column will be lost.
  - Added the required column `payment_id` to the `payment_events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment_events` DROP FOREIGN KEY `payment_events_paymentId_fkey`;

-- DropIndex
DROP INDEX `payment_events_paymentId_idx` ON `payment_events`;

-- AlterTable
ALTER TABLE `payment_events` DROP COLUMN `paymentId`,
    ADD COLUMN `payment_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `payment_events_payment_id_idx` ON `payment_events`(`payment_id`);

-- AddForeignKey
ALTER TABLE `payment_events` ADD CONSTRAINT `payment_events_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
