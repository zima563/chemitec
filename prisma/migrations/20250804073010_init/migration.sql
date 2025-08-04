-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `refreshToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameEn` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `nameFr` VARCHAR(191) NOT NULL,
    `descriptionEn` VARCHAR(191) NULL,
    `descriptionAr` VARCHAR(191) NULL,
    `descriptionFr` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NULL,
    `type` ENUM('BtoB', 'BtoC') NOT NULL,
    `brandId` INTEGER NULL,
    `industryId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandingImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `altEn` VARCHAR(191) NULL,
    `altAr` VARCHAR(191) NULL,
    `altFr` VARCHAR(191) NULL,
    `order` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameEn` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `nameFr` VARCHAR(191) NOT NULL,
    `descriptionEn` VARCHAR(191) NULL,
    `descriptionAr` VARCHAR(191) NULL,
    `descriptionFr` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Industry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameEn` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `nameFr` VARCHAR(191) NOT NULL,
    `descriptionEn` VARCHAR(191) NULL,
    `descriptionAr` VARCHAR(191) NULL,
    `descriptionFr` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameEn` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `nameFr` VARCHAR(191) NOT NULL,
    `descriptionEn` VARCHAR(191) NULL,
    `descriptionAr` VARCHAR(191) NULL,
    `descriptionFr` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nameEn` VARCHAR(191) NOT NULL,
    `nameAr` VARCHAR(191) NOT NULL,
    `nameFr` VARCHAR(191) NOT NULL,
    `positionEn` VARCHAR(191) NOT NULL,
    `positionAr` VARCHAR(191) NOT NULL,
    `positionFr` VARCHAR(191) NOT NULL,
    `bioEn` VARCHAR(191) NULL,
    `bioAr` VARCHAR(191) NULL,
    `bioFr` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactUs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuccessfulProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titleEn` VARCHAR(191) NOT NULL,
    `titleAr` VARCHAR(191) NOT NULL,
    `titleFr` VARCHAR(191) NOT NULL,
    `descriptionEn` VARCHAR(191) NULL,
    `descriptionAr` VARCHAR(191) NULL,
    `descriptionFr` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuccessfulProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `successfulProductId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_industryId_fkey` FOREIGN KEY (`industryId`) REFERENCES `Industry`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SuccessfulProductImage` ADD CONSTRAINT `SuccessfulProductImage_successfulProductId_fkey` FOREIGN KEY (`successfulProductId`) REFERENCES `SuccessfulProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
