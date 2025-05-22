import type { Units } from "./constants/units";

export type Source = {
  name?: string[];
  url?: string[];
};

export type Ingredient = {
  name: string;
  amount?: string; //para considerar fracciones //TODO cambiar a number?
  unit?: Units;
};

export type FoodAllergy = "glutenFree" | "dairyFree" | "vegan" | "vegetarian";

export type InstructionsSection = {
  sectionTitle?: string;
  sectionBody: string[];
};

export type IngredientsSection = {
  sectionTitle?: string;
  sectionBody: Ingredient[];
};

export type RecipeType = {
  title: string;
  ingredients: IngredientsSection[];
  cookingTime?: string[];
  mold?: string[];
  servings?: string[];
  instructions: InstructionsSection[];
  notes?: string[];
  source?: Source;
  foodAllergies?: FoodAllergy[];
};
