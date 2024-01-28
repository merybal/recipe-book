const UNITS = {
  // TODO completar
  GRAMS: "g",
  KILOGRAMS: "kg",
  PINCH: "pzc",
  TEASPOON: "cda",
  TABLESPOON: "cdta",
} as const;

type ObjectValues<T> = T[keyof T];

export type Units = ObjectValues<typeof UNITS>;
