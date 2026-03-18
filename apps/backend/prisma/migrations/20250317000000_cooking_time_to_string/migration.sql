-- AlterTable
-- Convert cooking_time from INTEGER to VARCHAR(255) to support values like "10-15 min"
ALTER TABLE "Recipes" ALTER COLUMN "cooking_time" TYPE VARCHAR(255) USING cooking_time::text;
