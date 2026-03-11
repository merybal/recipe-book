import { DIETARY_RESTRICTIONS } from "@/constants";

const restrictionMapInverse = Object.entries(DIETARY_RESTRICTIONS).reduce<
  Record<string, keyof typeof DIETARY_RESTRICTIONS>
>((acc, [key, value]) => {
  acc[value] = key as keyof typeof DIETARY_RESTRICTIONS;
  return acc;
}, {});

export function parseDietaryRestrictionsForBackend(
  key: keyof typeof DIETARY_RESTRICTIONS,
): string {
  return DIETARY_RESTRICTIONS[key];
}

export function parseDietaryRestrictionsForFrontend(
  key: string,
): keyof typeof DIETARY_RESTRICTIONS | undefined {
  return restrictionMapInverse[key];
}
