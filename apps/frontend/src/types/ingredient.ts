import type { Units } from "./constants/units";
import type { UnitRaw } from "./index";

export type IngredientType = {
  name: string;
  amount?: string; //para considerar fracciones //TODO cambiar a number?
  unit: Units | string; //TODO por si viene un ingrediente que no existe de la receta del formulario??
};

export type IngredientRaw = {
  id: number;
  subrecipe_id: number;
  name: string;
  amount: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  unit_id: number;
  units: UnitRaw;
};
