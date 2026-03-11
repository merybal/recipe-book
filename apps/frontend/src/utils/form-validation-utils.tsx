import { RecipeType } from "../types";

export const validateTitle = (title: string): string | null => {
  if (!title.trim()) return "El título es obligatorio";
  return null;
};

export const validateStepCover = (recipe: RecipeType): { title?: string } => {
  const errors: { title?: string } = {};
  if (!recipe.title.trim()) {
    errors.title = "El título es obligatorio";
  }
  return errors;
};

export const validateCategories = (
  recipe: RecipeType,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!recipe.categoryId) {
    errors.category = "La categoría es obligatoria";
  }
  const hasSubcategory =
    (recipe.subcategoryIds ?? []).some((id) => id > 0);
  if (recipe.categoryId && !hasSubcategory) {
    errors.subcategories = "Debe seleccionar al menos una subcategoría";
  }
  return errors;
};

export const validateBakingInstructions = (
  recipe: RecipeType,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const temp = recipe.bakingInstructions?.temperature;
  const time = recipe.bakingInstructions?.time;

  if (temp !== undefined) {
    if (typeof temp !== "number" || isNaN(temp) || temp <= 0) {
      errors.temperature = "Debe ser un número válido mayor a 0";
    }
  }

  if (time !== undefined) {
    if (typeof time !== "number" || isNaN(time) || time <= 0) {
      errors.time = "Debe ser un número válido mayor a 0";
    }
  }

  return errors;
};
