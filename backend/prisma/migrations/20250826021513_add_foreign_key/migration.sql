-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `movie_categoryId_fkey`;

-- DropIndex
DROP INDEX `movie_categoryId_fkey` ON `movie`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `movie` ADD COLUMN `userId` INTEGER NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie` ADD CONSTRAINT `movie_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movie` ADD CONSTRAINT `movie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
