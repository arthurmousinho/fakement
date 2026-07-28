-- CreateTable
CREATE TABLE `webhook_deliveries` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `status_code` INTEGER NULL,
    `error` VARCHAR(191) NULL,
    `endpoint_id` VARCHAR(191) NOT NULL,
    `payment_event_id` VARCHAR(191) NOT NULL,
    `delivered_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `webhook_deliveries_endpoint_id_idx`(`endpoint_id`),
    INDEX `webhook_deliveries_payment_event_id_idx`(`payment_event_id`),
    INDEX `webhook_deliveries_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `webhook_deliveries` ADD CONSTRAINT `webhook_deliveries_endpoint_id_fkey` FOREIGN KEY (`endpoint_id`) REFERENCES `webhook_endpoints`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `webhook_deliveries` ADD CONSTRAINT `webhook_deliveries_payment_event_id_fkey` FOREIGN KEY (`payment_event_id`) REFERENCES `payment_events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
