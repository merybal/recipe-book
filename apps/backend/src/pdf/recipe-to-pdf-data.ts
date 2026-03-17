import type { RecipePdfData } from './recipe-pdf.template';

type RawRecipe = {
  title: string;
  servings: string | null;
  cooking_time: number | null;
  cooking_temperature: number | null;
  mold_type: string | null;
  mold_size: string | null;
  subrecipes: {
    title: string | null;
    instructions: string;
    ingredients: {
      name: string;
      amount: number | null;
      units: {
        abbreviation_singular: string;
        abbreviation_plural: string | null;
      } | null;
    }[];
  }[];
  recipe_dietary_restrictions?: {
    dietary_restriction: { name_en?: string; name_es?: string; name: string };
  }[];
  recipe_notes?: { content: string }[];
  recipe_sources?: { name: string | null; url: string | null }[];
};

export function recipeToPdfData(recipe: RawRecipe): RecipePdfData {
  const bakingParts: string[] = [];
  if (recipe.cooking_time) bakingParts.push(`${recipe.cooking_time} min`);
  if (recipe.cooking_temperature)
    bakingParts.push(`${recipe.cooking_temperature}°C`);
  const bakingInfo =
    bakingParts.length > 0 ? bakingParts.join(' • ') : undefined;

  const moldParts: string[] = [];
  if (recipe.mold_type) moldParts.push(recipe.mold_type);
  if (recipe.mold_size) moldParts.push(recipe.mold_size);
  const mold =
    moldParts.length > 0 ? moldParts.join(' • ') : undefined;

  const sourceNames = recipe.recipe_sources
    ?.map((s) => s.name)
    .filter(Boolean) as string[] | undefined;
  const author = sourceNames?.length ? sourceNames.join(', ') : undefined;

  const sourceUrls = recipe.recipe_sources
    ?.map((s) => s.url)
    .filter(Boolean) as string[] | undefined;
  const sourceUrl = sourceUrls?.length ? sourceUrls.join(', ') : undefined;

  const dietaryRestrictions =
    recipe.recipe_dietary_restrictions?.map((rdr) => ({
      label:
        rdr.dietary_restriction.name_es ||
        rdr.dietary_restriction.name_en ||
        rdr.dietary_restriction.name,
      iconKey: rdr.dietary_restriction.name,
    })) ?? [];

  return {
    title: recipe.title,
    servings: recipe.servings ?? undefined,
    bakingInfo,
    mold,
    author: author ?? undefined,
    sourceUrl: sourceUrl ?? undefined,
    dietaryRestrictions:
      dietaryRestrictions.length > 0 ? dietaryRestrictions : undefined,
    subrecipes: recipe.subrecipes.map((sr) => {
      const unit = (amount: number | null, u: typeof sr.ingredients[0]['units']) =>
        u && amount != null && amount > 1 && u.abbreviation_plural
          ? u.abbreviation_plural
          : u?.abbreviation_singular;

      return {
        title: sr.title ?? undefined,
        ingredients: sr.ingredients.map((ing) => ({
          name: ing.name,
          amount: ing.amount ?? undefined,
          unit: unit(ing.amount, ing.units),
        })),
        instructions: sr.instructions
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      };
    }),
    notes: recipe.recipe_notes?.map((n) => n.content) ?? [],
  };
}
