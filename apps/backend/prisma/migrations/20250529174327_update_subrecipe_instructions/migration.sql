/*
  Warnings:

  - The `cooking_time` column on the `Recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "cooking_time",
ADD COLUMN     "cooking_time" INTEGER;
