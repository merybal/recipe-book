import { pdf } from "@react-pdf/renderer";
import { RecipePdfDocument } from "@/features/Recipe/RecipePdfDocument";
import type { RecipeType } from "@/types";

export async function exportRecipeToPdf(recipe: RecipeType): Promise<void> {
  const blob = await pdf(<RecipePdfDocument recipe={recipe} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${recipe.title.replace(/[^a-z0-9áéíóúñü\s-]/gi, "_")}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
