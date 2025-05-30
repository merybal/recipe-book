import { FOOD_ALLERGIES } from "./constants/food-allergies";

export type FoodAllergyType = keyof typeof FOOD_ALLERGIES;

// export type FoodAllergyType =
//   | "glutenFree"
//   | "dairyFree"
//   | "vegan"
//   | "vegetarian";

export type FoodAllergyRaw = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type RecipeFoodAllergyRaw = {
  id: number;
  recipe_id: number;
  food_allergy_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  food_allergy: FoodAllergyRaw;
};
