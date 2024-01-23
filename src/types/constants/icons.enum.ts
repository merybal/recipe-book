const ICONS = {} as const;
// TODO completar

type ObjectValues<T> = T[keyof T];

export type Icons = ObjectValues<typeof ICONS>;
