import { useEffect, useState } from "react";
import type { RecipeType } from "@/types";

import { Fragment } from "react";
import clsx from "clsx";
import Box from "@/design-system/components/Box";
import styles from "./RecipePreview.module.scss";
import Separator from "@/design-system/components/Separator";
import ButtonIcon from "@/design-system/components/ButtonIcon";

import { useDietaryRestrictionLabels } from "@/hooks/useDietaryRestrictionLabels";
import { formatAmountForDisplay } from "@/utils/idml-file-uploader-utils";

const COUNTRY_LABELS: Record<string, string> = {
  argentina: "Argentina",
  españa: "España",
  mexico: "México",
  italia: "Italia",
  francia: "Francia",
  peru: "Perú",
  colombia: "Colombia",
  chile: "Chile",
  uruguay: "Uruguay",
  otro: "Otro",
};


export type RecipePreviewProps = {
  className?: string;
  recipeData: RecipeType;
  onChange: (updatedRecipe: RecipeType) => void;
  coverImageFiles?: File[];
  onCoverImageChange?: (files: File[]) => void;
  onEditCover?: () => void;
  onEditSubrecipes?: () => void;
  onEditBakingInstructions?: () => void;
  onEditMold?: () => void;
  onEditCategories?: () => void;
  onEditAdditionalInfo?: () => void;
};

const RecipePreview = ({
  className,
  recipeData,
  onChange,
  coverImageFiles = [],
  onEditCover,
  onEditSubrecipes,
  onEditBakingInstructions,
  onEditMold,
  onEditCategories,
  onEditAdditionalInfo,
}: RecipePreviewProps) => {
  void onChange;

  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const dietaryRestrictionLabels = useDietaryRestrictionLabels();

  useEffect(() => {
    const file = coverImageFiles[0];
    if (!file) {
      setCoverPreviewUrl(null);
      return () => {};
    }
    const url = URL.createObjectURL(file);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImageFiles]);

  const coverImageSrc =
    coverPreviewUrl ?? (recipeData.imageUrl || undefined);
  const subrecipes = recipeData.subrecipes ?? [];
  const notes = recipeData.notes ?? [];
  const subcategories = recipeData.subcategories ?? [];
  const dietaryRestrictions = recipeData.dietaryRestrictions ?? [];
  const tags = recipeData.tags ?? [];

  const formatCountry = (value: string) => COUNTRY_LABELS[value] ?? value;

  return (
    <Box className={clsx(styles["recipe-preview"], className)} fullWidth>
      <Box className={styles.step}>
        <Box className={styles["step-header"]}>
          <h2>Portada</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar portada"
            size="small"
            onClick={() => onEditCover?.()}
          />
        </Box>
        <Box
          className={clsx(
            styles["cover-preview-layout"],
            !coverImageSrc && styles["cover-preview-layout--no-image"],
          )}
        >
          {coverImageSrc && (
            <Box className={styles["recipe-image"]}>
              <img src={coverImageSrc} alt={recipeData.title} />
            </Box>
          )}
          <Box className={styles["cover-preview-text"]}>
            <div>
              <h3>Título</h3>
              <p>{recipeData.title}</p>
            </div>
            {recipeData.introduction && (
              <div>
                <h3>Introducción</h3>
                <p className={styles["introduction-text"]}>
                  {recipeData.introduction}
                </p>
              </div>
            )}
            <div>
              <h3>
                {(recipeData.source?.name?.filter(Boolean).length ?? 0) === 1
                  ? "Autor"
                  : "Autores"}
              </h3>
              <p>
                {recipeData.source?.name?.filter(Boolean).length ? (
                  recipeData.source.name
                    .filter(Boolean)
                    .map((name, i) => (
                      <Fragment key={i}>
                        {i > 0 && ", "}
                        {name}
                      </Fragment>
                    ))
                ) : (
                  "-"
                )}
              </p>
            </div>
            <div>
              <h3>
                {(recipeData.source?.url?.filter((u) => u)?.length ?? 0) === 1
                  ? "Link a receta original"
                  : "Links a recetas originales"}
              </h3>
              <div className={styles["source-links"]}>
                {recipeData.source?.url?.filter((u) => u)?.length ? (
                  recipeData.source.url
                    .filter((u): u is string => !!u)
                    .map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["source-link"]}
                      >
                        {url}
                      </a>
                    ))
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </Box>
        </Box>
      </Box>

      <Separator />

      <Box className={styles.step}>
        <Box className={styles["step-header"]}>
          <h2>Molde</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar molde"
            size="small"
            onClick={() => onEditMold?.()}
          />
        </Box>
        <Box className={styles["preview-mold-row"]}>
          <div>
            <h3>Tipo</h3>
            <p>{recipeData.mold?.type ? recipeData.mold.type : "-"}</p>
          </div>
          <div>
            <h3>Tamaño</h3>
            <p>{recipeData.mold?.size ? recipeData.mold.size : "-"}</p>
          </div>
          <div>
            <h3>Rinde</h3>
            <p>{recipeData.servings ? recipeData.servings : "-"}</p>
          </div>
        </Box>
      </Box>

      <Separator />

      <Box className={styles.step}>
        <Box className={styles["step-header"]}>
          <h2>Cocción</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar cocción"
            size="small"
            onClick={() => onEditBakingInstructions?.()}
          />
        </Box>
        <Box className={styles["preview-baking-row"]}>
          <div>
            <h3>Tiempo</h3>
            <p>
              {recipeData.bakingInstructions?.time
                ? recipeData.bakingInstructions.time
                : "-"}
            </p>
          </div>
          <div>
            <h3>Temperatura</h3>
            <p>
              {recipeData.bakingInstructions?.temperature != null
                ? `${recipeData.bakingInstructions.temperature}°C`
                : "-"}
            </p>
          </div>
        </Box>
      </Box>

      <Separator />

      <Box className={styles.step}>
        <Box className={styles["step-header"]}>
          <h2>Preparación</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar preparación"
            size="small"
            onClick={() => onEditSubrecipes?.()}
          />
        </Box>
        {subrecipes.length === 0 ? (
          <p>-</p>
        ) : (
          subrecipes.map((sub, index) => (
            <Box key={index} className={styles["subrecipe-block"]}>
              {subrecipes.length > 1 && sub.title && (
                <div>
                  <h3>Título</h3>
                  <p>{sub.title}</p>
                </div>
              )}
              <Box className={styles["subrecipe-preview-columns"]}>
                <div>
                  <h3>Ingredientes</h3>
                  {sub.ingredients?.length ? (
                    <ul className={styles["ingredients-list"]}>
                      {sub.ingredients.map((i, idx) => (
                        <li key={idx} className={styles["ingredient-li"]}>
                          <p>{i.name},</p>
                          <div className={styles["ingredient-amount"]}>
                            {i.amount != null && (
                              <p>{formatAmountForDisplay(i.amount)}</p>
                            )}
                            {i.unit && <p>{i.unit}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div>
                  <h3>Instrucciones</h3>
                  {sub.instructions?.length ? (
                    <ol className={styles["instructions-list"]}>
                      {sub.instructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Separator />

      <Box className={styles.step}>
        <Box className={styles["step-header"]}>
          <h2>Categoría</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar categoría"
            size="small"
            onClick={() => onEditCategories?.()}
          />
        </Box>
        <div>
          <h3>Categoría</h3>
          <p>{recipeData.category ?? "-"}</p>
        </div>
        {subcategories.length > 0 && (
          <div>
            <h3>Subcategorías</h3>
            <p>{subcategories.join(", ")}</p>
          </div>
        )}
        {dietaryRestrictions.length > 0 && dietaryRestrictionLabels && (() => {
          const withLabels = dietaryRestrictions.filter(
            (r) => dietaryRestrictionLabels[r],
          );
          if (withLabels.length === 0) return null;
          return (
            <div>
              <h3>Dietas y restricciones</h3>
              <p>
                {withLabels
                  .map((r) => dietaryRestrictionLabels![r])
                  .join(", ")}
              </p>
            </div>
          );
        })()}
        {tags.length > 0 && (
          <div>
            <h3>Etiquetas</h3>
            <p>{tags.join(", ")}</p>
          </div>
        )}
      </Box>

      <Separator />

      <Box className={styles.step}>
        <Box className={styles["step-header"]}>
          <h2>Información adicional</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar información adicional"
            size="small"
            onClick={() => onEditAdditionalInfo?.()}
          />
        </Box>
        <div>
          <h3>Notas</h3>
          {notes.length > 0 ? (
            <ul className={styles["notes-list"]}>
              {notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
        <div>
          <h3>País de origen</h3>
          <p>
            {recipeData.countryOfOrigin
              ? formatCountry(recipeData.countryOfOrigin)
              : "-"}
          </p>
        </div>
      </Box>

      <Separator />
    </Box>
  );
};

export default RecipePreview;
