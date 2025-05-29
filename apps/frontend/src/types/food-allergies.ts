export type FoodAllergyType =
  | "glutenFree"
  | "dairyFree"
  | "vegan"
  | "vegetarian";

//TODO hacer un diccionario con lo que viene del back. corregir los datos cargados en la tabla del back

export type FoodAllergyRaw = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type RecipeFoodAllergyRaw = {
  id: number;
  recipe_id: number;
  food_allergy_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  food_allergy: FoodAllergyRaw;
};
