import type { Units } from "./constants/units";

export type Source = {
  name?: string[]; //name siempre obligatorio?
  url?: string[]; //puede tener mas de un link
};

export type Ingredient = {
  name: string;
  quantity?: string; //para considerar fracciones
  unit?: Units;
};

export type FoodAllergy = "glutenFree" | "lactoseFree" | "vegan" | "vegetarian";

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
  serves?: string[];
  instructions: InstructionsSection[];
  notes?: string[];
  source?: Source;
  foodAllergies?: FoodAllergy[];
};
