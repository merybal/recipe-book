import type {
  SubrecipeType,
  SubrecipeRaw,
  DietaryRestrictionType,
  RecipeDietaryRestrictionRaw,
} from "./index";

export type Source = {
  // TODO check if this changes when added to backend
  name?: string[];
  url?: (string | null)[];
};

export type BakingInstructionsType = {
  time?: string; // e.g. "45", "10-15 min"
  temperature?: number; // always celcius
};

export type MoldType = {
  type?: string;
  size?: string;
};

export type RecipeType = {
  id?: string; //when the recipe is created from the frontend it has no id
  title: string;
  imageUrl?: string;
  category?: string; // display name (from API)
  categoryId?: number; // for form submit
  subcategory?: string; // deprecated, use subcategories
  subcategories?: string[]; // display names (from API)
  subcategoryIds?: number[]; // for form submit
  tags?: string[];
  subrecipes: SubrecipeType[];
  bakingInstructions?: BakingInstructionsType;
  mold?: MoldType;
  introduction?: string;
  servings?: string;
  notes?: string[];
  source?: Source;
  dietaryRestrictions?: DietaryRestrictionType[];
  /** Labels from API (name_es/name_en) - used for display when available */
  dietaryRestrictionLabels?: Record<DietaryRestrictionType, string>;
  countryOfOrigin?: string; // display name (from API)
  countryId?: number; // for form submit
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
  subcategory_id: number;
  sort_order: number;
  subcategory: { id: number; name_en: string; name_es: string };
};

export type RecipeRaw = {
  id: number;
  title: string;
  category_id: number;
  category?: { id: number; name_en: string; name_es: string };
  country_id: number | null;
  country?: { id: number; name_en: string; name_es: string } | null;
  cooking_time: string | null;
  cooking_temperature: number | null;
  servings: string | null;
  mold_type: string | null;
  mold_size: string | null;
  introduction: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  subrecipes: SubrecipeRaw[];
  recipe_dietary_restrictions: RecipeDietaryRestrictionRaw[];
  recipe_notes?: RecipeNoteRaw[];
  recipe_sources?: RecipeSourceRaw[];
  recipe_tags?: RecipeTagRaw[];
  recipe_subcategories?: RecipeSubcategoryRaw[];
};
