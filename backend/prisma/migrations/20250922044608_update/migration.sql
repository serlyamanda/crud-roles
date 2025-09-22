/*
  Warnings:

  - Added the required column `updatedAt` to the `db_produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `db_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `db_produk` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `db_user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
