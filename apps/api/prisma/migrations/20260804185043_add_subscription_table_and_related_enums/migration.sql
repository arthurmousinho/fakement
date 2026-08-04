-- CreateTable
CREATE TABLE `subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amount_in_cents` INTEGER NOT NULL,
    `currency` ENUM('BRL', 'USD', 'EUR') NOT NULL,
    `method` ENUM('CARD', 'PIX', 'BANK_SLIP') NOT NULL,
    `interval` ENUM('DAY', 'WEEK', 'MONTH', 'YEAR') NOT NULL,
    `intervalCount` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('ACTIVE', 'PAUSED', 'CANCELED') NOT NULL DEFAULT 'ACTIVE',
    `next_billing_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `api_key_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_api_key_id_fkey` FOREIGN KEY (`api_key_id`) REFERENCES `api_keys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
