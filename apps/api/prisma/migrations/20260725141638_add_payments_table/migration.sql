-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `amount_in_cents` INTEGER NOT NULL,
    `currency` ENUM('BRL', 'USD', 'EUR') NOT NULL,
    `method` ENUM('CARD', 'PIX', 'BANK_SLIP') NOT NULL,
    `status` ENUM('CREATED', 'PROCESSING', 'APPROVED', 'DECLINED', 'CANCELED') NOT NULL DEFAULT 'CREATED',
    `description` VARCHAR(191) NULL,
    `external_id` VARCHAR(191) NULL,
    `idempotency_key` VARCHAR(191) NULL,
    `api_key_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payments_api_key_id_external_id_key`(`api_key_id`, `external_id`),
    UNIQUE INDEX `payments_api_key_id_idempotency_key_key`(`api_key_id`, `idempotency_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_api_key_id_fkey` FOREIGN KEY (`api_key_id`) REFERENCES `api_keys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
