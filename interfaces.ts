import {
  ALLERGY_TAGS,
  BAKING_PAN_SHAPES,
  COUNTRIES,
  ICONS,
  NOTE_LOCATIONS,
  RECIPE_CATEGORIES,
  RECIPE_SUBCATEGORIES,
  UNITS,
} from "./enums/index.enum";

interface RecipeStructure {
  title: string;
  preparations: // Las preparaciones pueden venir por separado o todos los ingredientes juntos
  {
    title?: string; // Si no tiene titulo es porque no tiene subpreparacion
    ingredients: {
      ingredient: string;
      quantity: string; // can be c/n
      unit?: UNITS; // not required because of c/n
    }[];
    steps: string;
  }[];
  serves?: string;
  notes?: {
    location: NOTE_LOCATIONS; //pre or post recipe
    note: string;
  }[];
  icon: ICONS; //check type, will be svg
  allergyTags?: ALLERGY_TAGS[];
  categories: RECIPE_CATEGORIES[];
  subCategories: RECIPE_SUBCATEGORIES[];
  source?: {
    author?: string;
    url?: string;
  };
  countryOfOrigin?: COUNTRIES;
  bakingPan?: {
    shape: BAKING_PAN_SHAPES;
    size: string;
  };
  bakingInstructions?: {
    time?: string; // hace falta subdividir?
    temperature?: string;
  };
}

export { RecipeStructure };
