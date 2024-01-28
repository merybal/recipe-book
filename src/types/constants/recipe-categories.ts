const RECIPE_CATEGORIES = {
  SWEET: "Dulce",
  SAVORY: "Salado",
  DRINK: "Trago",
} as const;

type ObjectValues<T> = T[keyof T];

export type RecipeCategories = ObjectValues<typeof RECIPE_CATEGORIES>;
