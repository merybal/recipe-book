import { RecipeType, IngredientType } from "../types";

export type RecipeStateType = {
  recipe: RecipeType;
  setRecipe: React.Dispatch<React.SetStateAction<RecipeType>>;
};

export type SubrecipeDraftType = {
  title: string;
  ingredientsText: string;
  ingredients: IngredientType[];
  instructionsText: string;
  instructions: string[];
};
