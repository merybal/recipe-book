const RECIPE_SUBCATEGORIES = {
  // TODO completar
  SOUP: "Sopa",
  BREAD: "Pan",
  CHICKEN: "Pollo",
  POTATO: "Papa",
  BEEF: "Carne",
  PORK: "Cerdo",
  FRUIT: "Fruta",
  CAKE: "Torta",
  TART: "Tarta",
} as const;

type ObjectValues<T> = T[keyof T];

export type RecipeSubcategories = ObjectValues<typeof RECIPE_SUBCATEGORIES>;
