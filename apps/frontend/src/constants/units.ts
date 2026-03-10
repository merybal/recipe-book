// TODO check if units from table are added with logic

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
  },
  TEASPOON: {
    abbreviation: { singular: "cdta", plural: "cdtas" },
    fullUnit: "cucharadita",
    name: "teaspoon",
    synonyms: ["teaspoon", "cdta", "cucharadita", "cucharadita de té"],
  },
  TABLESPOON: {
    abbreviation: { singular: "cda", plural: "cdas" },
    fullUnit: "cucharada sopera",
    name: "tablespoon",
    synonyms: ["tablespoon", "cda", "cucharada", "cucharada sopera"],
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
  },
  DICE: {
    abbreviation: { singular: "dado", plural: "dados" },
    fullUnit: "dado",
    name: "dice",
    synonyms: ["dice", "dado", "dados"],
  },
  CLOVE: {
    abbreviation: { singular: "diente", plural: "dientes" },
    fullUnit: "diente",
    name: "clove",
    synonyms: ["clove", "diente", "dientes"],
  },
} as const;

export type UnitObject = (typeof UNITS)[keyof typeof UNITS];
