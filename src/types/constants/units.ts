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

const UNITS = {
  // TODO completarlo
  GRAMS: "g",
  KILOGRAMS: "kg",
  PINCH: "pzc",
  TEASPOON: "cdta", //agregar plurales?
  TABLESPOON: "cda",
  AMOUNT_NEEDED: "c/n",
  MILILITERS: "ml",
  LITERS: "l",
  CUBIC_CENTIMITERS: "cc",
  CUP: "taza",
} as const;

const TEMPERATURES = {};

type ObjectValues<T> = T[keyof T];

export type Units = ObjectValues<typeof UNITS>;
// export default UNITS;
