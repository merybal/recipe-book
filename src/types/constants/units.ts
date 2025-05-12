// const UNITS = {
//   // TODO completar. Aagregar equivalencias?
//   GRAMS: { abbrv: "g", fullUnit: "gramos" },
//   KILOGRAMS: { abbrv: "kg", fullUnit: "kilogramos / kilos", equivalence: "" },
//   PINCH: { abbrv: "pzc", fullUnit: "pizca" },
//   TEASPOON: { abbrv: "cdta", fullUnit: "cucharadita de te" },
//   TABLESPOON: { abbrv: "cda", fullUnit: "cucharada sopera" },
//   AMOUNT_NEEDED: { abbrv: "c/n", fullUnit: "cantidad necesaria" },
//   MILILITERS: { abbrv: "ml", fullUnit: "mililitros" },
//   LITERS: { abbrv: "l", fullUnit: "litros" },
//   CUBIC_CENTIMITERS: { abbrv: "cc", fullUnit: "centímetros cúbicos" },
//   CUP: { abbrv: "taza", fullUnit: "taza" },
// } as const;

// const UNITS = {
//   // TODO completarlo
//   AMOUNT_NEEDED: "c/n",
//   GRAMS: "g",
//   KILOGRAMS: "kg",
//   PINCH: "pzc",
//   TEASPOON: "cdta", //agregar plurales?
//   TABLESPOON: "cda",
//   MILILITERS: "ml",
//   LITERS: "l",
//   CUBIC_CENTIMITERS: "cc",
//   CUP: "taza",
//   DICE: "dado",
//   CLOVE: "diente",
// } as const;
export type Unit = {
  abbrv: string;
  fullUnit: string;
  synonyms: string[];
};

export const UNITS: Record<string, Unit> = {
  GRAMS: {
    abbrv: "g",
    fullUnit: "gramos",
    synonyms: ["gramo", "gramos", "g"],
  },
  KILOGRAMS: {
    abbrv: "kg",
    fullUnit: "kilogramos",
    synonyms: ["kg", "kilo", "kilos", "kilogramo", "kilogramos"],
  },
  PINCH: {
    abbrv: "pzc",
    fullUnit: "pizca",
    synonyms: ["pizca", "pzc"],
  },
  TEASPOON: {
    abbrv: "cdta",
    fullUnit: "cucharadita",
    synonyms: ["cdta", "cucharadita", "cucharadita de té"],
  },
  TABLESPOON: {
    abbrv: "cda",
    fullUnit: "cucharada sopera",
    synonyms: ["cda", "cucharada", "cucharada sopera"],
  },
  AMOUNT_NEEDED: {
    abbrv: "c/n",
    fullUnit: "cantidad necesaria",
    synonyms: ["c/n", "cantidad necesaria"],
  },
  MILILITERS: {
    abbrv: "ml",
    fullUnit: "mililitros",
    synonyms: ["ml", "mililitro", "mililitros"],
  },
  LITERS: {
    abbrv: "l",
    fullUnit: "litros",
    synonyms: ["l", "litro", "litros"],
  },
  CUBIC_CENTIMETERS: {
    abbrv: "cc",
    fullUnit: "centímetros cúbicos",
    synonyms: ["cc", "cm3", "centímetro cúbico", "centímetros cúbicos"],
  },
  CUP: {
    abbrv: "taza",
    fullUnit: "taza",
    synonyms: ["taza", "tazas"],
  },
  DICE: {
    abbrv: "dado",
    fullUnit: "dado",
    synonyms: ["dado", "dados"],
  },
  CLOVE: {
    abbrv: "diente",
    fullUnit: "diente",
    synonyms: ["diente", "dientes"],
  },
} as const;

type UnitObject = (typeof UNITS)[keyof typeof UNITS];
export type Units = UnitObject["abbrv"];
