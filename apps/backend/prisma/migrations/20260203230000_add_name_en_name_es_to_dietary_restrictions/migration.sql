-- AlterTable
ALTER TABLE "DietaryRestrictions" ADD COLUMN "name_en" VARCHAR(255),
ADD COLUMN "name_es" VARCHAR(255);

-- Populate from name (gluten_free -> Gluten free / Sin gluten, etc.)
UPDATE "DietaryRestrictions" SET "name_en" = 'Gluten free', "name_es" = 'Sin gluten' WHERE "name" = 'gluten_free';
UPDATE "DietaryRestrictions" SET "name_en" = 'Dairy free', "name_es" = 'Sin lactosa' WHERE "name" = 'dairy_free';
UPDATE "DietaryRestrictions" SET "name_en" = 'Vegan', "name_es" = 'Vegano' WHERE "name" = 'vegan';
UPDATE "DietaryRestrictions" SET "name_en" = 'Vegetarian', "name_es" = 'Vegetariano' WHERE "name" = 'vegetarian';

-- Fallback for any other existing rows
UPDATE "DietaryRestrictions" SET "name_en" = COALESCE("name_en", "name"), "name_es" = COALESCE("name_es", "name") WHERE "name_en" IS NULL OR "name_es" IS NULL;

-- Make columns NOT NULL
ALTER TABLE "DietaryRestrictions" ALTER COLUMN "name_en" SET NOT NULL;
ALTER TABLE "DietaryRestrictions" ALTER COLUMN "name_es" SET NOT NULL;
