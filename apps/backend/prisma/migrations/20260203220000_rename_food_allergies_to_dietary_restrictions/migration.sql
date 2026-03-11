-- DropForeignKey
ALTER TABLE "RecipeFoodAllergies" DROP CONSTRAINT "RecipeFoodAllergies_food_allergy_id_fkey";

-- RenameTable
ALTER TABLE "FoodAllergies" RENAME TO "DietaryRestrictions";

-- RenameTable
ALTER TABLE "RecipeFoodAllergies" RENAME TO "RecipeDietaryRestrictions";

-- RenameColumn
ALTER TABLE "RecipeDietaryRestrictions" RENAME COLUMN "food_allergy_id" TO "dietary_restriction_id";

-- AddForeignKey
ALTER TABLE "RecipeDietaryRestrictions" ADD CONSTRAINT "RecipeDietaryRestrictions_dietary_restriction_id_fkey" FOREIGN KEY ("dietary_restriction_id") REFERENCES "DietaryRestrictions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex (for upsert in seed)
ALTER TABLE "DietaryRestrictions" ADD CONSTRAINT "DietaryRestrictions_name_key" UNIQUE ("name");
