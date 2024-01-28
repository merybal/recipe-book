const ICONS = {
  TART: "Tarta",
} as const;

type ObjectValues<T> = T[keyof T];

export type Icons = ObjectValues<typeof ICONS>;
