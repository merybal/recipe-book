import type { UnitAbbreviationsType, UnitRaw } from "./index";

export type IngredientType = {
  name: string;
  amount?: number;
  unit?: UnitAbbreviationsType | string; //TODO por si viene un ingrediente que no existe de la receta del formulario??
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
