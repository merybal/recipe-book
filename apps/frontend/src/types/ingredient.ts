import type { UnitAbbreviationsType, UnitRaw } from "./index";

export type IngredientType = {
  name: string;
  amount?: number;
  unit?: UnitAbbreviationsType | string; // TODO in case an ingredient from form doesn't exist in recipe??
};

export type IngredientRaw = {
  id: number;
  subrecipe_id: number;
  name: string;
  amount?: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  unit_id: number;
  units?: UnitRaw;
};
