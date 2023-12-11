/*
  Warnings:

  - You are about to drop the column `author_id` on the `Review` table. All the data in the column will be lost.
  - Added the required column `author_username` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_author_id_fkey`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `author_id`,
    ADD COLUMN `author_username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_author_username_fkey` FOREIGN KEY (`author_username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
