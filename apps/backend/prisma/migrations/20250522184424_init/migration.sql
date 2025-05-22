-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "cooking_time" VARCHAR(255),
    "cooking_temperature" INTEGER,
    "servings" VARCHAR(255),
    "mold_type" VARCHAR(255),
    "mold_size" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "subrecipe_title" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "amount" VARCHAR(255),
    "unit" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "subrecipe_title" VARCHAR(255),
    "body" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodAllergies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "FoodAllergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeFoodAllergies" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "food_allergy_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "RecipeFoodAllergies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeFoodAllergies" ADD CONSTRAINT "RecipeFoodAllergies_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeFoodAllergies" ADD CONSTRAINT "RecipeFoodAllergies_food_allergy_id_fkey" FOREIGN KEY ("food_allergy_id") REFERENCES "FoodAllergies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
