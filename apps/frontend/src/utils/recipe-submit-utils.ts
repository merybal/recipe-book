import axios from "axios";
import type { RecipeType, IngredientType } from "@/types";
import { DIETARY_RESTRICTIONS } from "@/constants";
import type { DietaryRestrictionType } from "@/types";

type UnitRaw = {
  id: number;
  abbreviation_singular: string;
  abbreviation_plural: string | null;
  synonyms: string[];
};

type DietaryRestrictionRaw = { id: number; name: string };

type CreateRecipeFullPayload = {
  title: string;
  category_id: number;
  country_id?: number;
  cooking_time?: string | null;
  cooking_temperature?: number | null;
  servings?: string;
  mold_type?: string;
  mold_size?: string;
  introduction?: string;
  image_url?: string;
  subrecipes: {
    title?: string;
    instructions: string;
    ingredients: { name: string; amount?: number; unit_id?: number }[];
  }[];
  dietary_restriction_ids: number[];
  notes?: string[];
  tags?: string[];
  subcategory_ids?: number[];
  source?: { name?: string; url?: string }[];
};

function findUnitId(
  unitAbbrev: string | undefined,
  units: UnitRaw[],
): number | undefined {
  if (!unitAbbrev?.trim()) return undefined;
  const normalized = unitAbbrev.trim().toLowerCase();
  const u = units.find(
    (x) =>
      x.abbreviation_singular.toLowerCase() === normalized ||
      (x.abbreviation_plural?.toLowerCase() === normalized) ||
      (x.synonyms as string[])
        ?.map((s) => s.toLowerCase())
        .includes(normalized),
  );
  return u?.id;
}

function mapIngredientToBackend(
  ing: IngredientType,
  units: UnitRaw[],
): { name: string; amount?: number; unit_id?: number } {
  const unitId = findUnitId(ing.unit, units);
  return {
    name: ing.name.trim(),
    ...(ing.amount != null && { amount: ing.amount }),
    ...(unitId != null && { unit_id: unitId }),
  };
}

export async function buildRecipePayload(
  recipe: RecipeType,
): Promise<CreateRecipeFullPayload> {
  const [unitsRes, dietaryRestrictionsRes] = await Promise.all([
    axios.get<UnitRaw[]>("/api/units"),
    axios.get<DietaryRestrictionRaw[]>("/api/dietary-restrictions"),
  ]);

  const units = unitsRes.data;
  const dietaryRestrictions = dietaryRestrictionsRes.data;

  const dietaryRestrictionIds =
    (recipe.dietaryRestrictions ?? [])
      .map((key: DietaryRestrictionType) => {
        const backendName = DIETARY_RESTRICTIONS[key];
        const dr = dietaryRestrictions.find((x) => x.name === backendName);
        return dr?.id;
      })
      .filter((id): id is number => id != null) ?? [];

  const subcategoryIds = (recipe.subcategoryIds ?? []).filter((id) => id > 0);

  // Pair authors with links: 1 author + 2 links -> (author, link1), (author, link2)
  const source =
    (recipe.source?.name?.length || recipe.source?.url?.length)
      ? (() => {
          const names = recipe.source!.name ?? [];
          const urls = recipe.source!.url ?? [];
          const len = Math.max(names.length, urls.length);
          return Array.from({ length: len }, (_, i) => {
            const name = (names[i] ?? names[names.length - 1])?.trim() || undefined;
            const url = (urls[i] ?? urls[urls.length - 1])?.trim() || undefined;
            return { name, url };
          }).filter((s) => s.name || s.url);
        })()
      : undefined;

  const payload: CreateRecipeFullPayload = {
    title: recipe.title.trim(),
    category_id: recipe.categoryId!,
    ...(recipe.countryId != null && { country_id: recipe.countryId }),
    // Send null when cleared so backend persists the deletion (omit = no update).
    // When editing (recipe.id), always send cooking fields to persist clears.
    // When creating, only send when user interacted with baking section.
    ...((recipe.id != null || recipe.bakingInstructions !== undefined) && {
      cooking_time: recipe.bakingInstructions?.time?.trim() || null,
      cooking_temperature: recipe.bakingInstructions?.temperature ?? null,
    }),
    ...(recipe.servings?.trim() && { servings: recipe.servings.trim() }),
    ...(recipe.mold?.type?.trim() && { mold_type: recipe.mold.type.trim() }),
    ...(recipe.mold?.size?.trim() && { mold_size: recipe.mold.size.trim() }),
    ...(recipe.introduction?.trim() && {
      introduction: recipe.introduction.trim(),
    }),
    subrecipes: recipe.subrecipes.map((sub) => ({
      ...(sub.title?.trim() && { title: sub.title.trim() }),
      instructions: (sub.instructions ?? []).join("\n"),
      ingredients: sub.ingredients.map((ing) =>
        mapIngredientToBackend(ing, units),
      ),
    })),
    dietary_restriction_ids: dietaryRestrictionIds,
    ...(recipe.notes?.length && {
      notes: recipe.notes.map((n) => n.trim()).filter(Boolean),
    }),
    ...(recipe.tags?.length && { tags: recipe.tags }),
    ...(subcategoryIds.length > 0 && { subcategory_ids: subcategoryIds }),
    ...(source?.length && { source }),
  };

  return payload;
}
