// Used for parseIngredientLine / normalizeUnit when parsing text (e.g. IDML).
// Full unit data lives in DB; this is the client-side mapping for text parsing.
import type { Unit } from "@/types";

export const UNITS: Record<string, Unit> = {
  GRAMS: {
    abbreviation: { singular: "g" },
    fullUnit: "gramos",
    name: "gram",
    synonyms: ["grams", "gramo", "gramos", "g"],
  },
  KILOGRAMS: {
    abbreviation: { singular: "kg" },
    fullUnit: "kilogramo",
    name: "kilogram",
    synonyms: ["kilogram", "kg", "kilo", "kilos", "kilogramo", "kilogramos"],
  },
  PINCH: {
    abbreviation: { singular: "pzc", plural: "pzcs" },
    fullUnit: "pizca",
    name: "pinch",
    synonyms: ["pinch", "pizca", "pzc"],
    pluralOnlyWhenGtOne: true,
  },
  TEASPOON: {
    abbreviation: { singular: "cdta", plural: "cdtas" },
    fullUnit: "cucharadita",
    name: "teaspoon",
    synonyms: ["teaspoon", "cdta", "cucharadita", "cucharadita de té"],
    pluralOnlyWhenGtOne: true,
  },
  TABLESPOON: {
    abbreviation: { singular: "cda", plural: "cdas" },
    fullUnit: "cucharada sopera",
    name: "tablespoon",
    synonyms: ["tablespoon", "cda", "cucharada", "cucharada sopera"],
    pluralOnlyWhenGtOne: true,
  },
  AMOUNT_NEEDED: {
    abbreviation: { singular: "c/n" },
    fullUnit: "cantidad necesaria",
    name: "amount_needed",
    synonyms: ["amount_needed", "c/n", "cantidad necesaria"],
  },
  MILILITERS: {
    abbreviation: { singular: "ml" },
    fullUnit: "mililitros",
    name: "milimeter",
    synonyms: ["mililiter", "mililitre", "ml", "mililitro", "mililitros"],
  },
  LITERS: {
    abbreviation: { singular: "l" },
    fullUnit: "litros",
    name: "liter",
    synonyms: ["liter", "litre", "l", "litro", "litros"],
  },
  CUBIC_CENTIMETERS: {
    abbreviation: { singular: "cc" },
    fullUnit: "centímetros cúbicos",
    name: "cubic_centimeter",
    synonyms: [
      "cubic_centimeter",
      "cubic centimeter",
      "cubic centimetre",
      "cc",
      "cm3",
      "centímetro cúbico",
      "centímetros cúbicos",
    ],
  },
  CUP: {
    abbreviation: { singular: "taza", plural: "tazas" },
    fullUnit: "taza",
    name: "cup",
    synonyms: ["cup", "taza", "tazas"],
    pluralOnlyWhenGtOne: true,
  },
  GLASS: {
    abbreviation: { singular: "vaso", plural: "vasos" },
    fullUnit: "vaso",
    name: "glass",
    synonyms: ["glass", "glasses", "vaso", "vasos"],
    pluralOnlyWhenGtOne: true,
  },
  DICE: {
    abbreviation: { singular: "dado", plural: "dados" },
    fullUnit: "dado",
    name: "dice",
    synonyms: ["dice", "dado", "dados"],
    pluralOnlyWhenGtOne: true,
  },
  CLOVE: {
    abbreviation: { singular: "diente", plural: "dientes" },
    fullUnit: "diente",
    name: "clove",
    synonyms: ["clove", "diente", "dientes"],
  },
  /** Lasagna / pasta sheets (e.g. for lasagna). */
  PASTA_SHEET: {
    abbreviation: { singular: "plancha", plural: "planchas" },
    fullUnit: "plancha",
    name: "sheet",
    synonyms: [
      "sheet",
      "sheets",
      "plancha",
      "planchas",
      "lasagna sheet",
      "lasagna sheets",
      "pasta sheet",
      "pasta sheets",
    ],
  },
  /** Pasta / lasagna layer (Spanish tapa; English layer). */
  TAPA: {
    abbreviation: { singular: "tapa", plural: "tapas" },
    fullUnit: "tapa",
    name: "layer",
    synonyms: ["layer", "layers", "tapa", "tapas"],
  },
  /** Leaf (e.g. bay leaf); phyllo/pasta sheets use plancha. */
  HOJA: {
    abbreviation: { singular: "hoja", plural: "hojas" },
    fullUnit: "hoja",
    name: "leaf",
    synonyms: ["hoja", "hojas", "leaf", "leaves"],
    pluralOnlyWhenGtOne: true,
  },
} as const;

export type UnitObject = (typeof UNITS)[keyof typeof UNITS];
