/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `db_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `db_produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `db_produk` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `db_user_username_key` ON `db_user`(`username`);

-- AddForeignKey
ALTER TABLE `db_produk` ADD CONSTRAINT `db_produk_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `db_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
