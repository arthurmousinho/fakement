-- CreateTable
CREATE TABLE `webhook_subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `endpoint_id` VARCHAR(191) NOT NULL,
    `event` ENUM('PAYMENT_CREATED', 'PAYMENT_PROCESSING', 'PAYMENT_APPROVED', 'PAYMENT_DECLINED', 'PAYMENT_CANCELED') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `webhook_subscriptions_event_idx`(`event`),
    UNIQUE INDEX `webhook_subscriptions_endpoint_id_event_key`(`endpoint_id`, `event`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `webhook_subscriptions` ADD CONSTRAINT `webhook_subscriptions_endpoint_id_fkey` FOREIGN KEY (`endpoint_id`) REFERENCES `webhook_endpoints`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
