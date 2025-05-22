import type { Units } from "./constants/units";

export type Source = {
  name?: string[];
  url?: string[];
};

export type Ingredient = {
  name: string;
  amount?: string; //para considerar fracciones //TODO CAMBIAR A AMOUNT
  unit?: Units;
};

export type FoodAllergy = "glutenFree" | "lactoseFree" | "vegan" | "vegetarian"; //TODO cambiar a dairy free

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
  serves?: string[]; //TODO CAMBIAR A SERVINGS
  instructions: InstructionsSection[];
  notes?: string[];
  source?: Source;
  foodAllergies?: FoodAllergy[];
};
