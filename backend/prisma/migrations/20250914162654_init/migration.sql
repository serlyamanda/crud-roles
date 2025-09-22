/*
  Warnings:

  - You are about to drop the column `categoryId` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_userId_fkey`;

-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `movie_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `movie_userId_fkey`;

-- DropIndex
DROP INDEX `movie_categoryId_fkey` ON `movie`;

-- DropIndex
DROP INDEX `movie_userId_fkey` ON `movie`;

-- AlterTable
ALTER TABLE `movie` DROP COLUMN `categoryId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `category`;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;
