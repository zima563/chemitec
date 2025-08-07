-- AlterTable
ALTER TABLE `brand` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `certificate` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `contactus` MODIFY `subject` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `industry` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `successfulproduct` MODIFY `descriptionEn` VARCHAR(1000) NULL,
    MODIFY `descriptionAr` VARCHAR(1000) NULL,
    MODIFY `descriptionFr` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `teammember` MODIFY `bioEn` VARCHAR(200) NULL,
    MODIFY `bioAr` VARCHAR(200) NULL,
    MODIFY `bioFr` VARCHAR(200) NULL;
