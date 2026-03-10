-- CreateTable
CREATE TABLE "Countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");
CREATE UNIQUE INDEX "Countries_code_key" ON "Countries"("code");

-- Migrate existing country_of_origin data to Countries
INSERT INTO "Countries" ("name", "updated_at")
SELECT DISTINCT "country_of_origin", CURRENT_TIMESTAMP
FROM "Recipes"
WHERE "country_of_origin" IS NOT NULL
ON CONFLICT ("name") DO NOTHING;

-- AddColumn
ALTER TABLE "Recipes" ADD COLUMN "country_id" INTEGER;

-- Update country_id with Countries IDs
UPDATE "Recipes" r
SET "country_id" = c."id"
FROM "Countries" c
WHERE r."country_of_origin" = c."name";

-- DropColumn
ALTER TABLE "Recipes" DROP COLUMN "country_of_origin";

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
