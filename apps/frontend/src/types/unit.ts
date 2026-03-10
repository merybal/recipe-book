import { UnitObject } from "../constants";

export type Abbreviation = {
  singular: string;
  plural?: string;
};

export type Unit = {
  abbreviation: Abbreviation;
  fullUnit: string; //TODO for conversion/explanation page
  name: string; // backend table name
  synonyms: string[];
};

type Singulars = UnitObject["abbreviation"]["singular"];
type Plurals = NonNullable<UnitObject["abbreviation"]["plural"]>;
export type UnitAbbreviationsType = Singulars | Plurals;

export type UnitRaw = {
  id: number;
  abbreviation_singular: string;
  abbreviation_plural?: string | null;
  name: string;
  name_en: string;
  name_es: string;
  synonyms: string[];
};
