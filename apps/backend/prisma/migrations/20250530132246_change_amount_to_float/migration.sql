/*
  Warnings:

  - The `amount` column on the `Ingredients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ingredients" DROP COLUMN "amount",
ADD COLUMN     "amount" DOUBLE PRECISION;
