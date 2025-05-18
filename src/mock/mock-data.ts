import { RecipeStructure } from "../types/interfaces";
import type { RecipeType } from "@/types/types";

const recipe: RecipeType = {
  title: "Torta de Manzana",
  instructions: [
    {
      sectionTitle: "Masa",
      sectionBody: [
        "Precalentar horno a 180ºC.",
        "Procesar la manteca, la harina y el azúcar juntos hasta obtener masa con aspecto de migas homogéneas. Si no tiene procesadora, dejar la manteca fuera hasta que tome consistencia blanda. Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar. Enfriar la masa en la heladera o freezer.",
        "Pelar y cortar la manzana en cubos de 1 a 1,5 cm. Enmantecar el molde y esparcir las manzanas sobre la base. Cubrir las manzanas esparciéndoles la masa sobre ellas.",
      ],
    },
    {
      sectionTitle: "Relleno",
      sectionBody: [
        "Precalentar horno a 110ºC.",
        "Procesar la manteca, la harina y el azúcar juntos hasta obtener masa con aspecto de migas homogéneas. Si no tiene procesadora, dejar la manteca fuera hasta que tome consistencia blanda. Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar. Enfriar la masa en la heladera o freezer.",
        "Pelar y cortar la manzana en cubos de 1 a 1,5 cm. Enmantecar el molde y esparcir las manzanas sobre la base. Cubrir las manzanas esparciéndoles la masa sobre ellas.",
      ],
    },
  ],
  ingredients: [
    {
      sectionTitle: "Masa",
      sectionBody: [
        {
          name: "Harina 0000",
          quantity: "116",
          unit: "g",
        },
        {
          name: "Manteca",
          quantity: "100",
          unit: "g",
        },
        {
          name: "Azúcar impalpable",
          quantity: "75",
          unit: "g",
        },
        {
          name: "Yema de huevo",
          quantity: "2",
        },
        {
          name: "Sal fina",
          quantity: "1",
        },
        {
          name: "Ralladura de limón",
          unit: "c/n",
        },
      ],
    },
    {
      sectionTitle: "Relleno",
      sectionBody: [
        {
          name: "Harina 000",
          quantity: "116",
          unit: "g",
        },
        {
          name: "Manteca",
          quantity: "100",
          unit: "g",
        },
        {
          name: "Azúcar impalpable",
          quantity: "75",
          unit: "g",
        },
        {
          name: "Yema de huevo",
          quantity: "2",
        },
        {
          name: "Sal fina",
          quantity: "1",
        },
        {
          name: "Ralladura de limón",
          unit: "c/n",
        },
      ],
    },
  ],
  cookingTime: ["10 min", "180°C"],
  mold: ["Circular", "22-24 cm"],
  serves: ["4 porciones"],
  notes: [
    "Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar.",
    "Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar.",
  ],
  source: {
    name: ["Paulina Cocina", "Laura Bolomo"],
    url: [
      "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
    ],
  },
  foodAllergies: ["lactoseFree", "glutenFree", "vegan"],
};

const recipes: Array<RecipeStructure> = [
  {
    id: 1,
    title: "Apple Crumble Lau",
    imgUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
    preparations: [
      {
        title: "Masa",
        ingredients: [
          {
            ingredient: "Harina 0000",
            quantity: "235",
            unit: "g",
          },
          {
            ingredient: "Manteca",
            quantity: "200",
            unit: "g",
          },
          {
            ingredient: "Azúcar impalpable",
            quantity: "150",
            unit: "g",
          },
          {
            ingredient: "Huevos",
            quantity: "2",
          },
          {
            ingredient: "Sal",
            quantity: "1",
            unit: "pzc",
          },
          {
            ingredient: "Ralladura de limón",
            unit: "c/n",
          },
        ],
        steps:
          "Precalentar el horno a 180°C.\nMezclar la manteca pomada con el azúcar con la batidora hasta que se haga una crema. Agregar los huevos y la ralladura de limón, y después la harina.\nLlevar a la heladera 1 hora o al freezer 30 min.\nEstirar la masa hasta lograr un espesor de 5 mm (no menos que eso porque se puede desarmar por el líquido del relleno). Fonzar el molde enmantecado y pinchar la masa con un tenedor hasta atravesarla, para que no se infle. Cubrir con papel aluminio y dar peso con garbanzos o porotos.\nDarle una primera cocción en el horno a 180°C durante 10 min, destapar y cocer 5-10 min mas sin dejar que se dore. Tiene que quedar “blanca”.",
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
        location: "pre",
        note: "Sacar la manteca de la heladera con anticipacion ya que se necesita en estado pomada para todas las preparaciones.",
      },
    ],
    icon: "tarta",
    allergyTags: ["Vegetariano"],
    categories: ["Dulce"],
    subCategories: ["Torta", "Tarta", "Fruta"],
    source: {
      author: "Lau Bolomo",
    },
    countryOfOrigin: "United Kingdom",
    bakingPan: {
      shape: "Circular",
      size: "24 cm",
    },
    bakingInstructions: {
      temperature: "180°C",
    },
  },
];

export { recipes, recipe };
