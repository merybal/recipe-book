import type {
  SubrecipeType,
  SubrecipeRaw,
  FoodAllergyType,
  RecipeFoodAllergyRaw,
} from "./index";

export type Source = {
  // TODO check if this changes when added to backend
  name?: string[];
  url?: string[];
};

export type BakingInstructionsType = {
  time?: number; // always minutes
  temperature?: number; //always celcius
};

export type MoldType = {
  type?: string;
  size?: string;
};

export type RecipeType = {
  id?: string; //when the recipe is created from the frontend it has no id
  title: string;
  imageUrl?: string;
  category?: string; // e.g. "salado" | "dulce"
  subcategory?: string; // deprecated, use subcategories
  subcategories?: string[]; // up to 3, depends on category
  tags?: string[];
  subrecipes: SubrecipeType[];
  bakingInstructions?: BakingInstructionsType;
  mold?: MoldType;
  servings?: string;
  notes?: string[];
  source?: Source; // TODO missing in backend
  foodAllergies?: FoodAllergyType[];
  countryOfOrigin?: string;
};

export type RecipeNoteRaw = {
  id: number;
  recipe_id: number;
  content: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type RecipeSourceRaw = {
  id: number;
  recipe_id: number;
  name: string | null;
  url: string | null;
  sort_order: number;
};

export type RecipeTagRaw = {
  id: number;
  recipe_id: number;
  tag_id: number;
  tag: { id: number; name: string };
};

export type RecipeSubcategoryRaw = {
  id: number;
  recipe_id: number;
  value: string;
  sort_order: number;
};

export type RecipeRaw = {
  id: number;
  title: string;
  category: string | null;
  country_of_origin: string | null;
  cooking_time: number | null;
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
  recipe_notes?: RecipeNoteRaw[];
  recipe_sources?: RecipeSourceRaw[];
  recipe_tags?: RecipeTagRaw[];
  recipe_subcategories?: RecipeSubcategoryRaw[];
};
