const ALLERGY_TAGS = {
  GLUTEN: "Sin gluten",
  LACTOSE: "Sin lactosa",
  VEGETARIAN: "Vegetariano",
  VEGAN: "Vegano",
} as const;

type ObjectValues<T> = T[keyof T];

export type AllergyTags = ObjectValues<typeof ALLERGY_TAGS>;
