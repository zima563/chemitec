-- AlterTable
ALTER TABLE `Brand` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `Certificate` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `ContactUs` MODIFY `subject` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `Industry` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `Successfulproduct` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `Teammember` MODIFY `bioEn` VARCHAR(200) NULL,
    MODIFY `bioAr` VARCHAR(200) NULL,
    MODIFY `bioFr` VARCHAR(200) NULL;
