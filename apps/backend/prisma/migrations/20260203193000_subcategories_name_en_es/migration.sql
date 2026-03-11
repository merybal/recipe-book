-- Add name_en and name_es columns (nullable first for data migration)
ALTER TABLE "Subcategories" ADD COLUMN "name_en" VARCHAR(255);
ALTER TABLE "Subcategories" ADD COLUMN "name_es" VARCHAR(255);

-- Copy existing name to both columns (current data is in Spanish)
UPDATE "Subcategories" SET "name_en" = "name", "name_es" = "name";

-- Make columns NOT NULL
ALTER TABLE "Subcategories" ALTER COLUMN "name_en" SET NOT NULL;
ALTER TABLE "Subcategories" ALTER COLUMN "name_es" SET NOT NULL;

-- Drop old unique constraint and column
DROP INDEX "Subcategories_name_key";
ALTER TABLE "Subcategories" DROP COLUMN "name";

-- Add unique constraint on name_en
CREATE UNIQUE INDEX "Subcategories_name_en_key" ON "Subcategories"("name_en");
