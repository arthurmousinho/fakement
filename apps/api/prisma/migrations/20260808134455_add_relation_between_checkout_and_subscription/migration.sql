-- AlterTable
ALTER TABLE `checkouts` ADD COLUMN `subscription_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `checkouts` ADD CONSTRAINT `checkouts_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
