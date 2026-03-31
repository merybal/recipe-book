export type UnitAbbreviationsType = string;

export type UnitRaw = {
  id: number;
  abbreviation_singular: string;
  abbreviation_plural?: string | null;
  name: string;
  name_en: string;
  name_es: string;
  synonyms: string[];
};
