import type {
  SubrecipeType,
  SubrecipeRaw,
  FoodAllergyType,
  RecipeFoodAllergyRaw,
} from "./index";

export type Source = {
  // TODO revisar si se cambia cuando se agregue al back
  name?: string[];
  url?: string[];
};

export type BakingInstructionsType = {
  time?: string;
  temperature?: number;
};

export type MoldType = {
  type: string;
  size: string;
};

export type RecipeType = {
  id: string;
  title: string;
  imageUrl?: string;
  subrecipes: SubrecipeType[];
  bakingInstructions?: BakingInstructionsType;
  mold?: MoldType;
  servings?: string;
  notes?: string[]; //TODO falta en el back
  source?: Source; //TODO falta en el back
  foodAllergies?: FoodAllergyType[];
};

export type RecipeRaw = {
  id: number;
  title: string;
  cooking_time: string | null;
  cooking_temperature: number | null;
  servings: string | null;
  mold_type: string | null;
  mold_size: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  subrecipes: SubrecipeRaw[];
  recipe_food_allergies: RecipeFoodAllergyRaw[];
};
