-- CreateTable Categories
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "name_es" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Categories_name_en_key" ON "Categories"("name_en");

-- Insert categories (Sweet/dulce, Savory/salado)
INSERT INTO "Categories" ("name_en", "name_es", "updated_at")
VALUES ('Sweet', 'Dulce', CURRENT_TIMESTAMP),
       ('Savory', 'Salado', CURRENT_TIMESTAMP);

-- Add category_id to Subcategories
ALTER TABLE "Subcategories" ADD COLUMN "category_id" INTEGER;

-- Assign subcategories to categories: Sweet = Pie, Muffin, Cake, Ice cream, Cookie, Scone; Savory = Rice, Beef, Chicken, Pork
UPDATE "Subcategories" SET "category_id" = (SELECT id FROM "Categories" WHERE "name_en" = 'Sweet')
WHERE "name_en" IN ('Pie', 'Muffin', 'Cake', 'Ice cream', 'Cookie', 'Scone');

UPDATE "Subcategories" SET "category_id" = (SELECT id FROM "Categories" WHERE "name_en" = 'Savory')
WHERE "name_en" IN ('Rice', 'Beef', 'Chicken', 'Pork');

-- Fallback: any remaining NULL gets Sweet
UPDATE "Subcategories" SET "category_id" = (SELECT id FROM "Categories" WHERE "name_en" = 'Sweet')
WHERE "category_id" IS NULL;

-- Make category_id NOT NULL and add FK
ALTER TABLE "Subcategories" ALTER COLUMN "category_id" SET NOT NULL;
ALTER TABLE "Subcategories" ADD CONSTRAINT "Subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add category_id to Recipes
ALTER TABLE "Recipes" ADD COLUMN "category_id" INTEGER;

-- Migrate Recipes: dulce -> category 1, salado -> category 2
UPDATE "Recipes" SET "category_id" = (SELECT id FROM "Categories" WHERE "name_en" = 'Sweet')
WHERE "category" = 'dulce';

UPDATE "Recipes" SET "category_id" = (SELECT id FROM "Categories" WHERE "name_en" = 'Savory')
WHERE "category" = 'salado';

-- Default to Sweet for any NULL (e.g. empty or other values)
UPDATE "Recipes" SET "category_id" = (SELECT id FROM "Categories" WHERE "name_en" = 'Sweet')
WHERE "category_id" IS NULL;

ALTER TABLE "Recipes" ALTER COLUMN "category_id" SET NOT NULL;
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Drop old category column
ALTER TABLE "Recipes" DROP COLUMN "category";
