/*
  Warnings:

  - You are about to drop the column `is_test` on the `Ingredients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredients" DROP COLUMN "is_test";

-- AlterTable
ALTER TABLE "Recipes" ADD COLUMN     "is_test" BOOLEAN NOT NULL DEFAULT false;
