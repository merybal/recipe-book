const ICONS = {
  TART: "tarta",
  TACO: "taco",
} as const;

type ObjectValues<T> = T[keyof T];

export type Icons = ObjectValues<typeof ICONS>;
