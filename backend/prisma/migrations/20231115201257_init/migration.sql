-- AlterTable
ALTER TABLE `user` ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_id` INTEGER NOT NULL,
    `game_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
