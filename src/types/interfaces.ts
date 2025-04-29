import {
  AllergyTags,
  BakingPanShapes,
  Countries,
  Icons,
  NoteLocations,
  RecipeCategories,
  RecipeSubcategories,
  Units,
} from "./constants";

interface Ingredient {
  ingredient: string;
  quantity?: string; //como tipar para que sea Numero entero, Numero con coma y fraccion
  unit?: Units; // not required because of c/n
}

interface Preparation {
  title?: string;
  ingredients: Ingredient[];
  steps: string;
}

interface PreparationsProps {
  preparations: Preparation[];
}

interface RecipeStructure {
  id: number;
  title: string;
  imgUrl: string;
  /* Las preparaciones pueden venir por separado o todos los ingredientes juntos */
  preparations: Preparation[];
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

export type { RecipeStructure, Ingredient, Preparation, PreparationsProps };
