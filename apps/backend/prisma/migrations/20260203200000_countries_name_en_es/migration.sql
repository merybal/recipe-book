-- AlterTable: replace name with name_en and name_es
ALTER TABLE "Countries" ADD COLUMN "name_en" VARCHAR(255);
ALTER TABLE "Countries" ADD COLUMN "name_es" VARCHAR(255);

-- Migrate existing data (copy name to both columns)
UPDATE "Countries" SET "name_en" = "name", "name_es" = "name";

-- Set NOT NULL
ALTER TABLE "Countries" ALTER COLUMN "name_en" SET NOT NULL;
ALTER TABLE "Countries" ALTER COLUMN "name_es" SET NOT NULL;

-- Make code NOT NULL (existing rows have code)
UPDATE "Countries" SET "code" = 'XX' WHERE "code" IS NULL;
ALTER TABLE "Countries" ALTER COLUMN "code" SET NOT NULL;

-- Drop old column
ALTER TABLE "Countries" DROP COLUMN "name";
