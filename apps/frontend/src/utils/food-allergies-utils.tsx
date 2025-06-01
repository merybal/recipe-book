import { FOOD_ALLERGIES } from "@/constants";

const allergyMapInverse = Object.entries(FOOD_ALLERGIES).reduce<
  Record<string, keyof typeof FOOD_ALLERGIES>
>((acc, [key, value]) => {
  acc[value] = key as keyof typeof FOOD_ALLERGIES;
  return acc;
}, {});

// camelCase to snake_case
export function parseFoodAllergiesforBackend(
  key: keyof typeof FOOD_ALLERGIES
): string {
  return FOOD_ALLERGIES[key];
}

//snake_case to camelCase
export function parseFoodAllergiesforFrontend(
  key: string
): keyof typeof FOOD_ALLERGIES | undefined {
  return allergyMapInverse[key];
}
