/*
  Warnings:

  - A unique constraint covering the columns `[key_hash]` on the table `api_keys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `api_keys_key_hash_key` ON `api_keys`(`key_hash`);
