-- CreateTable CategorySubcategories (junction for many-to-many)
CREATE TABLE "CategorySubcategories" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "subcategory_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategorySubcategories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CategorySubcategories_category_id_subcategory_id_key" ON "CategorySubcategories"("category_id", "subcategory_id");

-- Migrate existing data: for each Subcategory, insert into CategorySubcategories
INSERT INTO "CategorySubcategories" ("category_id", "subcategory_id")
SELECT "category_id", "id" FROM "Subcategories";

-- Add Scone to Savory as well (it was only in Sweet before)
INSERT INTO "CategorySubcategories" ("category_id", "subcategory_id")
SELECT (SELECT id FROM "Categories" WHERE "name_en" = 'Savory'), s.id
FROM "Subcategories" s
WHERE s."name_en" = 'Scone'
ON CONFLICT ("category_id", "subcategory_id") DO NOTHING;

-- Drop FK and category_id from Subcategories
ALTER TABLE "Subcategories" DROP CONSTRAINT "Subcategories_category_id_fkey";
ALTER TABLE "Subcategories" DROP COLUMN "category_id";

-- Add FKs to CategorySubcategories
ALTER TABLE "CategorySubcategories" ADD CONSTRAINT "CategorySubcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CategorySubcategories" ADD CONSTRAINT "CategorySubcategories_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
