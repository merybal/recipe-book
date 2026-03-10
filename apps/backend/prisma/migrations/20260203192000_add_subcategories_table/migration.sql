-- CreateTable
CREATE TABLE "Subcategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategories_name_key" ON "Subcategories"("name");

-- Migrate existing RecipeSubcategories.value to Subcategories
INSERT INTO "Subcategories" ("name", "updated_at")
SELECT DISTINCT "value", CURRENT_TIMESTAMP
FROM "RecipeSubcategories"
ON CONFLICT ("name") DO NOTHING;

-- AddColumn
ALTER TABLE "RecipeSubcategories" ADD COLUMN "subcategory_id" INTEGER;

-- Update subcategory_id with Subcategories IDs
UPDATE "RecipeSubcategories" rs
SET "subcategory_id" = s."id"
FROM "Subcategories" s
WHERE rs."value" = s."name";

-- Delete orphan rows (if any) and make column NOT NULL
DELETE FROM "RecipeSubcategories" WHERE "subcategory_id" IS NULL;
ALTER TABLE "RecipeSubcategories" ALTER COLUMN "subcategory_id" SET NOT NULL;

-- DropColumn
ALTER TABLE "RecipeSubcategories" DROP COLUMN "value";

-- AddForeignKey
ALTER TABLE "RecipeSubcategories" ADD CONSTRAINT "RecipeSubcategories_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
