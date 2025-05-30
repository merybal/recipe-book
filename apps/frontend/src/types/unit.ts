import { UnitObject } from "./constants/units";

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
