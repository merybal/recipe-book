//TODO ver si se agregan las unidades de la tabla con logica

import type { Unit } from "@/types";

export const UNITS: Record<string, Unit> = {
  GRAMS: {
    abbreviation: { singular: "g" },
    fullUnit: "gramos",
    synonyms: ["grams", "gramo", "gramos", "g"],
  },
  KILOGRAMS: {
    abbreviation: { singular: "kg" },
    fullUnit: "kilogramo",
    synonyms: ["kilogram", "kg", "kilo", "kilos", "kilogramo", "kilogramos"],
  },
  PINCH: {
    abbreviation: { singular: "pzc", plural: "pzcs" },
    fullUnit: "pizca",
    synonyms: ["pinch", "pizca", "pzc"],
  },
  TEASPOON: {
    abbreviation: { singular: "cdta", plural: "cdtas" },
    fullUnit: "cucharadita",
    synonyms: ["teaspoon", "cdta", "cucharadita", "cucharadita de té"],
  },
  TABLESPOON: {
    abbreviation: { singular: "cda", plural: "cdas" },
    fullUnit: "cucharada sopera",
    synonyms: ["tablespoon", "cda", "cucharada", "cucharada sopera"],
  },
  AMOUNT_NEEDED: {
    abbreviation: { singular: "c/n" },
    fullUnit: "cantidad necesaria",
    synonyms: ["amount_needed", "c/n", "cantidad necesaria"],
  },
  MILILITERS: {
    abbreviation: { singular: "ml" },
    fullUnit: "mililitros",
    synonyms: ["mililiter", "mililitre", "ml", "mililitro", "mililitros"],
  },
  LITERS: {
    abbreviation: { singular: "l" },
    fullUnit: "litros",
    synonyms: ["liter", "litre", "l", "litro", "litros"],
  },
  CUBIC_CENTIMETERS: {
    abbreviation: { singular: "cc" },
    fullUnit: "centímetros cúbicos",
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
    synonyms: ["cup", "taza", "tazas"],
  },
  DICE: {
    abbreviation: { singular: "dado", plural: "dados" },
    fullUnit: "dado",
    synonyms: ["dice", "dado", "dados"],
  },
  CLOVE: {
    abbreviation: { singular: "diente", plural: "dientes" },
    fullUnit: "diente",
    synonyms: ["clove", "diente", "dientes"],
  },
} as const;

export type UnitObject = (typeof UNITS)[keyof typeof UNITS];
