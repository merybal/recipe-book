-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_unit_id_fkey";

-- AlterTable
ALTER TABLE "Ingredients" ALTER COLUMN "unit_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
