-- CreateTable
CREATE TABLE `checkouts` (
    `id` VARCHAR(191) NOT NULL,
    `success_url` VARCHAR(191) NOT NULL,
    `cancel_url` VARCHAR(191) NOT NULL,
    `api_key_id` VARCHAR(191) NOT NULL,
    `payment_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `checkouts_api_key_id_idx`(`api_key_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkouts` ADD CONSTRAINT `checkouts_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkouts` ADD CONSTRAINT `checkouts_api_key_id_fkey` FOREIGN KEY (`api_key_id`) REFERENCES `api_keys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
