import { RecipeType, IngredientType } from "../types";

export type ErrorStateType = {
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export type RecipeStateType = {
  recipe: RecipeType;
  setRecipe: React.Dispatch<React.SetStateAction<RecipeType>>;
} & ErrorStateType;

export type SubrecipeDraftType = {
  title: string;
  ingredientsText: string;
  ingredients: IngredientType[];
  instructionsText: string;
  instructions: string[];
};
