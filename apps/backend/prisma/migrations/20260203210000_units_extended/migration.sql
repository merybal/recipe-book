-- Add new columns
ALTER TABLE "Units" ADD COLUMN "abbreviation_singular" VARCHAR(50);
ALTER TABLE "Units" ADD COLUMN "abbreviation_plural" VARCHAR(50);
ALTER TABLE "Units" ADD COLUMN "name_en" VARCHAR(255);
ALTER TABLE "Units" ADD COLUMN "name_es" VARCHAR(255);
ALTER TABLE "Units" ADD COLUMN "synonyms" JSONB;

-- Migrate existing data: map name to new structure (if any rows exist)
-- Using abbreviation_singular from name as fallback
UPDATE "Units" SET
  "abbreviation_singular" = COALESCE("name", 'g'),
  "abbreviation_plural" = NULL,
  "name_en" = "name",
  "name_es" = "name",
  "synonyms" = to_jsonb(ARRAY["name"])
WHERE "abbreviation_singular" IS NULL;

-- Set NOT NULL
ALTER TABLE "Units" ALTER COLUMN "abbreviation_singular" SET NOT NULL;
ALTER TABLE "Units" ALTER COLUMN "name_en" SET NOT NULL;
ALTER TABLE "Units" ALTER COLUMN "name_es" SET NOT NULL;
ALTER TABLE "Units" ALTER COLUMN "synonyms" SET NOT NULL;

-- Drop old column
ALTER TABLE "Units" DROP COLUMN "name";

-- Add unique constraint
CREATE UNIQUE INDEX "Units_abbreviation_singular_key" ON "Units"("abbreviation_singular");
