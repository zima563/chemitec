/*
  Warnings:

  - You are about to drop the column `description` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `certificate` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `certificate` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `industry` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `industry` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `landingimage` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `successfulproduct` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `successfulproduct` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `teammember` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teammember` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `teammember` table. All the data in the column will be lost.
  - Added the required column `nameAr` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `Industry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Industry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `Industry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `SuccessfulProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `SuccessfulProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleFr` to the `SuccessfulProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAr` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionAr` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionEn` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionFr` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `brand` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `descriptionAr` VARCHAR(191) NULL,
    ADD COLUMN `descriptionEn` VARCHAR(191) NULL,
    ADD COLUMN `descriptionFr` VARCHAR(191) NULL,
    ADD COLUMN `nameAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameFr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `certificate` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `descriptionAr` VARCHAR(191) NULL,
    ADD COLUMN `descriptionEn` VARCHAR(191) NULL,
    ADD COLUMN `descriptionFr` VARCHAR(191) NULL,
    ADD COLUMN `nameAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameFr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `industry` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `descriptionAr` VARCHAR(191) NULL,
    ADD COLUMN `descriptionEn` VARCHAR(191) NULL,
    ADD COLUMN `descriptionFr` VARCHAR(191) NULL,
    ADD COLUMN `nameAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameFr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `landingimage` DROP COLUMN `alt`,
    ADD COLUMN `altAr` VARCHAR(191) NULL,
    ADD COLUMN `altEn` VARCHAR(191) NULL,
    ADD COLUMN `altFr` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `description`,
    DROP COLUMN `name`,
    ADD COLUMN `descriptionAr` VARCHAR(191) NULL,
    ADD COLUMN `descriptionEn` VARCHAR(191) NULL,
    ADD COLUMN `descriptionFr` VARCHAR(191) NULL,
    ADD COLUMN `nameAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameFr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `successfulproduct` DROP COLUMN `description`,
    DROP COLUMN `title`,
    ADD COLUMN `descriptionAr` VARCHAR(191) NULL,
    ADD COLUMN `descriptionEn` VARCHAR(191) NULL,
    ADD COLUMN `descriptionFr` VARCHAR(191) NULL,
    ADD COLUMN `titleAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleFr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teammember` DROP COLUMN `bio`,
    DROP COLUMN `name`,
    DROP COLUMN `position`,
    ADD COLUMN `bioAr` VARCHAR(191) NULL,
    ADD COLUMN `bioEn` VARCHAR(191) NULL,
    ADD COLUMN `bioFr` VARCHAR(191) NULL,
    ADD COLUMN `nameAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameFr` VARCHAR(191) NOT NULL,
    ADD COLUMN `positionAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `positionEn` VARCHAR(191) NOT NULL,
    ADD COLUMN `positionFr` VARCHAR(191) NOT NULL;
