import { useEffect, useState } from "react";
import type { RecipeType, DietaryRestrictionType } from "@/types";

import clsx from "clsx";
import styles from "./RecipePreview.module.scss";
import Separator from "@/design-system/components/Separator";
import ButtonIcon from "@/design-system/components/ButtonIcon";

const DIETARY_RESTRICTION_LABELS: Record<DietaryRestrictionType, string> = {
  glutenFree: "Sin gluten",
  dairyFree: "Sin lactosa",
  vegetarian: "Vegetariano",
  vegan: "Vegano",
};

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
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

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

  const coverImageSrc = coverPreviewUrl ?? undefined;
  const subrecipes = recipeData.subrecipes ?? [];
  const notes = recipeData.notes ?? [];
  const subcategories = recipeData.subcategories ?? [];
  const dietaryRestrictions = recipeData.dietaryRestrictions ?? [];
  const tags = recipeData.tags ?? [];

  const formatCountry = (value: string) => COUNTRY_LABELS[value] ?? value;

  return (
    <div className={clsx(styles["recipe-preview"], className)}>
      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Portada</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar portada"
            size="small"
            onClick={() => onEditCover?.()}
          />
        </div>
        {coverImageSrc && (
          <div className={styles["recipe-image"]}>
            <img src={coverImageSrc} alt={recipeData.title} />
          </div>
        )}
        <div>
          <h3>Título</h3>
          <p>{recipeData.title}</p>
        </div>
        <div>
          <h3>Rinde</h3>
          <p>{recipeData.servings ? recipeData.servings : "-"}</p>
        </div>
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Molde</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar molde"
            size="small"
            onClick={() => onEditMold?.()}
          />
        </div>
        <div>
          <h3>Tipo</h3>
          <p>{recipeData.mold?.type ? recipeData.mold.type : "-"}</p>
        </div>
        <div>
          <h3>Tamaño</h3>
          <p>{recipeData.mold?.size ? recipeData.mold.size : "-"}</p>
        </div>
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Cocción</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar cocción"
            size="small"
            onClick={() => onEditBakingInstructions?.()}
          />
        </div>
        <div>
          <h3>Temperatura</h3>
          <p>
            {recipeData.bakingInstructions?.temperature != null
              ? `${recipeData.bakingInstructions.temperature}°C`
              : "-"}
          </p>
        </div>
        <div>
          <h3>Tiempo</h3>
          <p>
            {recipeData.bakingInstructions?.time != null
              ? `${recipeData.bakingInstructions.time} min`
              : "-"}
          </p>
        </div>
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Preparación</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar preparación"
            size="small"
            onClick={() => onEditSubrecipes?.()}
          />
        </div>
        {subrecipes.length === 0 ? (
          <p>-</p>
        ) : (
          subrecipes.map((sub, index) => (
            <div key={index} className={styles["subrecipe-block"]}>
              {subrecipes.length > 1 && sub.title && (
                <div>
                  <h3>Título</h3>
                  <p>{sub.title}</p>
                </div>
              )}
              <div>
                <h3>Ingredientes</h3>
                {sub.ingredients?.length ? (
                  <ul className={styles["ingredients-list"]}>
                    {sub.ingredients.map((i, idx) => (
                      <li key={idx} className={styles["ingredient-li"]}>
                        <p>{i.name},</p>
                        <div className={styles["ingredient-amount"]}>
                          {i.amount != null && <p>{i.amount}</p>}
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
            </div>
          ))
        )}
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Categoría</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar categoría"
            size="small"
            onClick={() => onEditCategories?.()}
          />
        </div>
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
        {dietaryRestrictions.length > 0 && (
          <div>
            <h3>Dietas y restricciones</h3>
            <p>
              {dietaryRestrictions
                .map((r) => DIETARY_RESTRICTION_LABELS[r] ?? r)
                .join(", ")}
            </p>
          </div>
        )}
        {tags.length > 0 && (
          <div>
            <h3>Etiquetas</h3>
            <p>{tags.join(", ")}</p>
          </div>
        )}
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Información adicional</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar información adicional"
            size="small"
            onClick={() => onEditAdditionalInfo?.()}
          />
        </div>
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
      </div>

      <Separator />
    </div>
  );
};

export default RecipePreview;
