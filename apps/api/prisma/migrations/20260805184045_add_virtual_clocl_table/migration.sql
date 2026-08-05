-- CreateTable
CREATE TABLE `virtual_clock` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `current_datetime` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
