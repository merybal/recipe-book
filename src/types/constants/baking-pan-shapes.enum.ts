const BAKING_PAN_SHAPES = {
  ROUND: "Circular",
  SQUARE: "Cuadrado",
  RECTANGULAR: "Rectangular",
  LOAF: "Budinera",
} as const;

type ObjectValues<T> = T[keyof T];

export type BakingPanShapes = ObjectValues<typeof BAKING_PAN_SHAPES>;
