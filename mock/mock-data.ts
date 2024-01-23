import { RecipeStructure } from "../src/types/interfaces";
import {
  ALLERGY_TAGS,
  BAKING_PAN_SHAPES,
  COUNTRIES,
  ICONS,
  NOTE_LOCATIONS,
  RECIPE_CATEGORIES,
  RECIPE_SUBCATEGORIES,
  UNITS,
} from "../src/types/enums/index.enum";

let recipes: Array<RecipeStructure> = [
  {
    title: "Apple Crumble Lau",
    preparations: [
      {
        title: "Masa",
        ingredients: [
          {
            ingredient: "Harina 0000",
            quantity: "235",
            unit: UNITS.GRAMS,
          },
          {
            ingredient: "Manteca",
            quantity: "200",
            unit: UNITS.GRAMS,
          },
          {
            ingredient: "Azúcar impalpable",
            quantity: "150",
            unit: UNITS.GRAMS,
          },
          {
            ingredient: "Huevos",
            quantity: "2",
          },
          {
            ingredient: "Sal",
            quantity: "1",
            unit: UNITS.PINCH,
          },
          {
            ingredient: "Ralladura de limón",
            quantity: "c/n",
          },
        ],
        steps: `Precalentar el horno a 180°C.
        Mezclar la manteca pomada con el azúcar con la batidora hasta que se haga una crema. Agregar los huevos y la ralladura de limón, y después la harina.
        Llevar a la heladera 1 hora o al freezer 30 min.
        Estirar la masa hasta lograr un espesor de 5 mm (no menos que eso porque se puede desarmar por el líquido del relleno). Fonzar el molde enmantecado y pinchar la masa con un tenedor hasta atravesarla, para que no se infle. Cubrir con papel aluminio y dar peso con garbanzos o porotos.
        Darle una primera cocción en el horno a 180°C durante 10 min, destapar y cocer 5-10 min mas sin dejar que se dore. Tiene que quedar “blanca”`,
      },
      {
        title: "Relleno",
        ingredients: [
          {
            ingredient: "Manzanas verdes",
            quantity: "4",
          },
        ],
        steps: `Pelar las manzanas, sacarles las semillas y cortar en cubos grandes.
        Llevar a una olla a fuego bajo, con todos los ingredientes menos la canela. Tapar y cocinar por 10, hasta que esten un poco transparentes. Se tienen que cocinar sin llegar a hacerse pure. Apagar el fuego, remover el anís estrellado y desechar. Escurrir un poco las manzanas si tienen mucho líquido. Agregar canela y revolver.`,
      },
    ],
    notes: [
      {
        location: NOTE_LOCATIONS.PRE,
        note: "Sacar la manteca de la heladera con anticipacion ya que se necesita en estado pomada para todas las preparaciones.",
      },
    ],
    icon: ICONS,
    allergyTags: [ALLERGY_TAGS.VEGETARIAN],
    categories: [RECIPE_CATEGORIES.SWEET],
    subCategories: [
      RECIPE_SUBCATEGORIES.CAKE,
      RECIPE_SUBCATEGORIES.TART,
      RECIPE_SUBCATEGORIES.FRUIT,
    ],
    source: {
      author: "Lau Bolomo",
    },
    countryOfOrigin: COUNTRIES.GB,
    bakingPan: {
      shape: BAKING_PAN_SHAPES.ROUND,
      size: "24 cm",
    },
    bakingInstructions: {
      temperature: "180°C",
    },
  },
];

export default recipes;
