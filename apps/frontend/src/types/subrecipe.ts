import { IngredientType, IngredientRaw } from "./ingredient";

export type SubrecipeType = {
  title?: string;
  instructions: string;
  ingredients: IngredientType[];
};

export type SubrecipeRaw = {
  id: number;
  recipe_id: number;
  title: string | null;
  instructions: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  ingredients: IngredientRaw[];
};

export type SubrecipeIdmlType = {
  sectionTitle?: string;
  sectionBody: string[];
};
