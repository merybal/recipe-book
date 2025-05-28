/*
  Warnings:

  - You are about to drop the column `recipe_id` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `subrecipe_title` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Ingredients` table. All the data in the column will be lost.
  - You are about to drop the `Instructions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subrecipe_id` to the `Ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "Instructions" DROP CONSTRAINT "Instructions_recipe_id_fkey";

-- AlterTable
ALTER TABLE "Ingredients" DROP COLUMN "recipe_id",
DROP COLUMN "subrecipe_title",
DROP COLUMN "unit",
ADD COLUMN     "subrecipe_id" INTEGER NOT NULL,
ADD COLUMN     "unit_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Instructions";

-- CreateTable
CREATE TABLE "Subrecipes" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "title" VARCHAR(255),
    "instructions" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Subrecipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Units" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Units_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_subrecipe_id_fkey" FOREIGN KEY ("subrecipe_id") REFERENCES "Subrecipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subrecipes" ADD CONSTRAINT "Subrecipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
