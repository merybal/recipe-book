import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import Instructions from "@/features/Recipe/Instructions";
import IngredientList from "@/features/Recipe/IngredientList";
import BottomSheet from "../../design-system/components/BottomSheet";
import DietaryRestrictions from "./DietaryRestrictions";
import Separator from "../../design-system/components/Separator/Separator";
import Source from "./Source";
import ButtonIcon from "@/design-system/components/ButtonIcon/ButtonIcon";
import Tabs, { Tab } from "@/design-system/components/Tabs";

import { parseDietaryRestrictionsForFrontend } from "@/utils/dietary-restrictions-utils";
import { RecipePdfPreview } from "./RecipePdfPreview";

import type {
  RecipeType,
  SubrecipeType,
  SubrecipeRaw,
  IngredientType,
  IngredientRaw,
  RecipeDietaryRestrictionRaw,
  RecipeNoteRaw,
  RecipeSourceRaw,
  RecipeTagRaw,
  RecipeSubcategoryRaw,
  DietaryRestrictionType,
} from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocale } from "@/hooks/useLocale";

import type { IconName } from "@/design-system/components/Icon";

import styles from "./RecipeView.module.scss";
import Icon from "@/design-system/components/Icon/Icon";

function RecipeInfoItem({
  icon,
  title,
  items,
}: {
  icon: IconName;
  title: string;
  /** Valores a mostrar; se filtran los vacíos y se separan con bullets. */
  items: (string | undefined | null)[];
}) {
  const validItems = items.filter((x): x is string => x != null && x !== "");
  if (validItems.length === 0) return null;

  return (
    <div className={styles.item}>
      <div className={styles["item-header"]}>
        <Icon name={icon} color="secondary-dark" size="sm" />
        <p>{title}</p>
      </div>
      <div className={styles.info}>
        <p>•</p>
        {validItems.map((item, i) => (
          <Fragment key={i}>
            <p>{item}</p>
            {i < validItems.length - 1 && <p>•</p>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * // TODO
 * - hay que programar el volver a la pagina anterior?
 * - desktop
 */

const RecipeView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const isMobile = useIsMobile();
  const locale = useLocale();

  useEffect(() => {
    if (!id) return;

    // TODO move to utils or hook

    function parseIngredient(ingredient: IngredientRaw): IngredientType {
      const units = ingredient.units;
      const amount = ingredient.amount;
      const parsedUnit =
        units &&
        (amount && amount > 1 && units.abbreviation_plural
          ? units.abbreviation_plural
          : units.abbreviation_singular);

      const parsedIngredient: IngredientType = {
        name: ingredient.name,
        ...(ingredient.amount && { amount: ingredient.amount }),
        ...(parsedUnit && { unit: parsedUnit }),
      };

      return parsedIngredient;
    }

    function parseSubrecipe(subrecipe: SubrecipeRaw) {
      const parsedSubrecipe: SubrecipeType = {
        ...(subrecipe.title && { title: subrecipe.title }),

        //"Batir los huevos\nAgregar la harina\nHornear"
        instructions: subrecipe.instructions
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean), // TODO change to parse separating paragraphs with /n
        ingredients: subrecipe.ingredients.map(parseIngredient),
      };

      return parsedSubrecipe;
    }

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipes/${id}`);

        const recipeData = response.data;
        console.log("recipeData", recipeData);

        const parsedRecipe: RecipeType = {
          id: id,
          title: recipeData.title,
          ...(recipeData.image_url && { imageUrl: recipeData.image_url }),
          ...(recipeData.category && {
            category:
              locale === "en"
                ? recipeData.category.name_en
                : recipeData.category.name_es,
            categoryId: recipeData.category.id,
          }),
          ...(recipeData.country && {
            countryOfOrigin:
              locale === "en"
                ? recipeData.country.name_en
                : recipeData.country.name_es,
            countryId: recipeData.country.id,
          }),
          subrecipes: recipeData.subrecipes.map(parseSubrecipe),

          ...(recipeData.cooking_time || recipeData.cooking_temperature
            ? {
                bakingInstructions: {
                  ...(recipeData.cooking_time && {
                    time: recipeData.cooking_time,
                  }),
                  ...(recipeData.cooking_temperature && {
                    temperature: recipeData.cooking_temperature,
                  }),
                },
              }
            : {}),

          ...(recipeData.mold_type || recipeData.mold_size
            ? {
                mold: {
                  ...(recipeData.mold_type && { type: recipeData.mold_type }),
                  ...(recipeData.mold_size && { size: recipeData.mold_size }),
                },
              }
            : {}),

          ...(recipeData.servings && { servings: recipeData.servings }),

          ...(recipeData.recipe_dietary_restrictions?.length
            ? (() => {
                const rdr = recipeData.recipe_dietary_restrictions!;
                const types = rdr
                  .map((item: RecipeDietaryRestrictionRaw) =>
                    parseDietaryRestrictionsForFrontend(
                      item.dietary_restriction.name,
                    ),
                  )
                  .filter(
                    (x: DietaryRestrictionType | undefined): x is DietaryRestrictionType =>
                      x != null,
                  );
                const labels = rdr.reduce(
                  (
                    acc: Record<DietaryRestrictionType, string>,
                    item: RecipeDietaryRestrictionRaw,
                  ) => {
                    const type = parseDietaryRestrictionsForFrontend(
                      item.dietary_restriction.name,
                    );
                    if (type) {
                      const dr = item.dietary_restriction as {
                        name: string;
                        name_en?: string;
                        name_es?: string;
                      };
                      acc[type] =
                        locale === "en"
                          ? dr.name_en ?? dr.name
                          : dr.name_es ?? dr.name;
                    }
                    return acc;
                  },
                  {} as Record<DietaryRestrictionType, string>,
                );
                return {
                  dietaryRestrictions: types,
                  dietaryRestrictionLabels: labels,
                };
              })()
            : {}),
          ...(recipeData.recipe_notes?.length > 0 && {
            notes: recipeData.recipe_notes
              .sort(
                (a: RecipeNoteRaw, b: RecipeNoteRaw) =>
                  a.sort_order - b.sort_order,
              )
              .map((n: RecipeNoteRaw) => n.content),
          }),
          ...(recipeData.recipe_sources?.length > 0 && {
            source: {
              name: recipeData.recipe_sources
                .sort(
                  (a: RecipeSourceRaw, b: RecipeSourceRaw) =>
                    a.sort_order - b.sort_order,
                )
                .map((s: RecipeSourceRaw) => s.name ?? "")
                .filter(Boolean) as string[],
              url: recipeData.recipe_sources
                .sort(
                  (a: RecipeSourceRaw, b: RecipeSourceRaw) =>
                    a.sort_order - b.sort_order,
                )
                .map((s: RecipeSourceRaw) => s.url ?? null) as (string | null)[],
            },
          }),
          ...(recipeData.recipe_tags?.length > 0 && {
            tags: recipeData.recipe_tags.map((rt: RecipeTagRaw) => rt.tag.name),
          }),
          ...(recipeData.recipe_subcategories?.length > 0 && {
            subcategories: recipeData.recipe_subcategories
              .sort(
                (a: RecipeSubcategoryRaw, b: RecipeSubcategoryRaw) =>
                  a.sort_order - b.sort_order,
              )
              .map((s: RecipeSubcategoryRaw) =>
                locale === "en" ? s.subcategory.name_en : s.subcategory.name_es,
              ),
            subcategoryIds: recipeData.recipe_subcategories
              .sort(
                (a: RecipeSubcategoryRaw, b: RecipeSubcategoryRaw) =>
                  a.sort_order - b.sort_order,
              )
              .map((s: RecipeSubcategoryRaw) => s.subcategory_id),
          }),
        };

        console.log("parsed recipe", parsedRecipe);

        setRecipe(parsedRecipe);
      } catch (err) {
        console.error(err);
        setError("Hubo un error al cargar la receta");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No se encontró la receta</div>;

  const content = (
    <div className={styles["recipe-container"]}>
      <header>
        <h1 className={styles.title}>{recipe.title}</h1>
        <div className={styles["button-container"]}>
          <ButtonIcon
            icon="Pencil"
            label="Editar"
            size="small"
            variant="primary"
            onClick={() =>
              navigate(`/recipes/${id}/edit`, { state: { recipe } })
            }
          />
          <ButtonIcon
            icon="Share2"
            label="Compartir receta"
            size="small"
            variant="primary"
            onClick={() => {
              console.log("compartir receta");
            }}
          />
          <ButtonIcon
            icon="FileUp"
            label="Vista previa PDF"
            size="small"
            variant="primary"
            onClick={() => setShowPdfPreview(true)}
          />
          <ButtonIcon
            icon="Download"
            label="Descargar receta como PDF"
            size="small"
            variant="primary"
            onClick={async () => {
              if (!recipe?.id) return;
              const res = await axios.get(`/api/recipes/${recipe.id}/pdf`, {
                responseType: "blob",
              });
              const url = URL.createObjectURL(res.data);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${recipe.title.replace(/[^a-z0-9áéíóúñü\s-]/gi, "_")}.pdf`;
              link.click();
              URL.revokeObjectURL(url);
            }}
          />
        </div>
      </header>

      <Separator marginTop="lg" marginBottom={recipe.source ? "md" : "lg"} />

      {recipe.source && (
        <>
          <div className={styles["source-container"]}>
            <Source
              source={
                recipe.source ?? {
                  name: ["Laura Bolomo"],
                  url: [
                    "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
                  ],
                }
              }
            />
          </div>
          <Separator marginTop="md" marginBottom="lg" />
        </>
      )}

      <Tabs defaultValue="Información">
        <Tab value="Información" label="Información">
          <div className={styles["recipe-info-container"]}>
            <div className={styles["baking-container"]}>
              {recipe.bakingInstructions && (
                <RecipeInfoItem
                  icon="Clock"
                  title="Cocción"
                  items={[
                    recipe.bakingInstructions.time
                      ? recipe.bakingInstructions.time
                      : undefined,
                    recipe.bakingInstructions.temperature
                      ? `${recipe.bakingInstructions.temperature}°C`
                      : undefined,
                  ]}
                />
              )}
              {recipe.mold && (
                <RecipeInfoItem
                  icon="Cylinder"
                  title="Molde"
                  items={[recipe.mold.type, recipe.mold.size]}
                />
              )}
              {recipe.servings && (
                <RecipeInfoItem
                  icon="Utensils"
                  title="Rinde"
                  items={[recipe.servings]}
                />
              )}
              {recipe.category && (
                <RecipeInfoItem
                  icon="ChefHat"
                  title="Categoría"
                  items={[recipe.category, ...(recipe.subcategories ?? [])]}
                />
              )}
            </div>

            {/* TODO agregar notas */}
          </div>

          <Separator marginY="lg" />

          {recipe.dietaryRestrictions && (
            <DietaryRestrictions
              restrictions={recipe.dietaryRestrictions}
              labels={recipe.dietaryRestrictionLabels}
            />
          )}
        </Tab>
        <Tab value="Receta" label="Receta">
          <IngredientList subrecipes={recipe.subrecipes} />
          <Separator marginY="lg" />
          <Instructions isNumbered subrecipes={recipe.subrecipes} />
        </Tab>
      </Tabs>
    </div>
  );

  return (
    <>
      <div className={styles["image-container"]}>
        <img
          className={styles["recipe-image"]}
          src={
            recipe.imageUrl ??
            "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg"
          }
          alt={recipe.title}
        />
      </div>
      {isMobile ? <BottomSheet>{content}</BottomSheet> : <div>{content}</div>}
      {showPdfPreview && (
        <RecipePdfPreview
          recipe={recipe}
          onClose={() => setShowPdfPreview(false)}
        />
      )}
    </>
  );
};

export default RecipeView;
