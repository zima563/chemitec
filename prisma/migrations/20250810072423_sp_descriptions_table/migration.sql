/*
  Warnings:

  - Made the column `descriptionEn` on table `successfulproduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descriptionAr` on table `successfulproduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descriptionFr` on table `successfulproduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `successfulproduct` MODIFY `descriptionEn` JSON NOT NULL,
    MODIFY `descriptionAr` JSON NOT NULL,
    MODIFY `descriptionFr` JSON NOT NULL;
