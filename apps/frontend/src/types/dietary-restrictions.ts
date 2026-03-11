import { DIETARY_RESTRICTIONS } from "../constants";

export type DietaryRestrictionType = keyof typeof DIETARY_RESTRICTIONS;

export type DietaryRestrictionRaw = {
  id: number;
  name: string;
  name_en: string;
  name_es: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type RecipeDietaryRestrictionRaw = {
  id: number;
  recipe_id: number;
  dietary_restriction_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  dietary_restriction: DietaryRestrictionRaw;
};
