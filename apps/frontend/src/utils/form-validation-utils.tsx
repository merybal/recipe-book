import { RecipeType } from "../types";

export const validateTitle = (title: string): string | null => {
  if (!title.trim()) return "El título es obligatorio";
  return null;
};

export const validateCoverStep = (recipe: RecipeType): { title?: string } => {
  const errors: { title?: string } = {};
  if (!recipe.title.trim()) {
    errors.title = "El título es obligatorio";
  }
  return errors;
};
