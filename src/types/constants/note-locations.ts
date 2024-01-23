const NOTE_LOCATIONS = {
  PRE: "pre",
  POST: "post",
} as const;

type ObjectValues<T> = T[keyof T];

export type NoteLocations = ObjectValues<typeof NOTE_LOCATIONS>;
