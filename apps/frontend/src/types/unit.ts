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
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
