import type { PreviewData } from "@/features/Home/TileGrid";
import type { DietaryRestrictionType } from "@/types";
import { parseDietaryRestrictionsForFrontend } from "@/utils/dietary-restrictions-utils";

type ApiRecipeRow = {
  id: number;
  title: string;
  image_url: string | null;
  recipe_dietary_restrictions?: Array<{
    dietary_restriction: { name: string };
  }>;
  recipe_sources?: Array<{
    name: string | null;
    url: string | null;
    sort_order: number;
  }>;
};

export function mapApiRecipeToPreviewData(r: ApiRecipeRow): PreviewData {
  return {
    id: r.id,
    title: r.title,
    imageUrl: r.image_url ?? undefined,
    dietaryRestrictions: r.recipe_dietary_restrictions
      ?.map((rdr) =>
        parseDietaryRestrictionsForFrontend(rdr.dietary_restriction.name),
      )
      .filter((dr): dr is DietaryRestrictionType => dr !== undefined),
    ...(r.recipe_sources?.length
      ? {
          source: {
            name: r.recipe_sources
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((s) => s.name ?? "")
              .filter(Boolean) as string[],
            url: r.recipe_sources
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((s) => s.url ?? ""),
          },
        }
      : {}),
  };
}
