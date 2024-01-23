import {
  AllergyTags,
  BakingPanShapes,
  Countries,
  Icons,
  NoteLocations,
  RecipeCategories,
  RecipeSubcategories,
  Units,
} from "./constants/index.enum";

interface RecipeStructure {
  title: string;
  preparations: // Las preparaciones pueden venir por separado o todos los ingredientes juntos
  {
    title?: string; // Si no tiene titulo es porque no tiene subpreparacion
    ingredients: {
      ingredient: string;
      quantity: string; // can be c/n
      unit?: Units; // not required because of c/n
    }[];
    steps: string;
  }[];
  serves?: string;
  notes?: {
    location: NoteLocations; //pre or post recipe
    note: string;
  }[];
  icon: Icons; //check type, will be svg
  allergyTags?: AllergyTags[];
  categories: RecipeCategories[];
  subCategories: RecipeSubcategories[];
  source?: {
    author?: string;
    url?: string;
  };
  countryOfOrigin?: Countries;
  bakingPan?: {
    shape: BakingPanShapes;
    size: string;
  };
  bakingInstructions?: {
    time?: string; // hace falta subdividir?
    temperature?: string;
  };
}

export type { RecipeStructure };
