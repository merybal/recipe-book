import { useEffect, useState } from "react";
import type { RecipeType } from "@/types";

import clsx from "clsx";
import styles from "./RecipePreview.module.scss";
import EditableInput from "../../design-system/src/components/EditableInput/EditableInput";
import MultipleEditableFields from "@/design-system/src/components/MultipleEditableFields";
import EditableTextarea from "@/design-system/src/components/EditableTextarea";
import Separator from "@/design-system/src/components/Separator";
import ButtonIcon from "@/design-system/src/components/ButtonIcon";

export type RecipePreviewProps = {
  className?: string;
  recipeData: RecipeType;
  onChange: (updatedRecipe: RecipeType) => void;
  /** Imagen de portada cargada en el step 1 (para previsualizar/cambiar en el preview). */
  coverImageFiles?: File[];
  /** Se llama cuando el usuario cambia la imagen de portada desde el preview. */
  onCoverImageChange?: (files: File[]) => void;
};

const RecipePreview = ({
  className,
  recipeData,
  onChange,
  coverImageFiles = [],
  onCoverImageChange,
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

  // Solo la imagen cargada en el step 0 (portada), no recipeData.imageUrl
  const coverImageSrc = coverPreviewUrl ?? undefined;

  return (
    <div className={clsx(styles["recipe-preview"], className)}>
      <div className={styles["step-cover"]}>
        <div className={styles["step-cover-header"]}>
          <h2>Portada</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar portada"
            size="small"
            onClick={() => {}}
          />
        </div>
        {coverImageSrc && (
          <div className={styles["recipe-image"]}>
            <img src={coverImageSrc} alt={recipeData.title} />
          </div>
        )}
        <h1 className={styles["recipe-title"]}>{recipeData.title}</h1>
        <h3>Rinde</h3>
        <p>{recipeData.servings ? recipeData.servings : "-"}</p>
      </div>

      <Separator />

      <EditableInput
        id="mold-type-input"
        label="Tipo de molde"
        value={recipeData.mold?.type ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            mold: { ...recipeData.mold, type: newValue },
          })
        }
      />

      <EditableInput
        id="mold-size-input"
        label="Tamaño del molde"
        value={recipeData.mold?.size ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            mold: { ...recipeData.mold, size: newValue },
          })
        }
      />

      <EditableInput
        id="temperature-input"
        label="Temperatura de horneado en Celcius (°C)"
        type="number"
        value={recipeData.bakingInstructions?.temperature?.toString() ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            bakingInstructions: {
              ...recipeData.bakingInstructions,
              temperature: parseInt(newValue, 10),
            },
          })
        }
      />

      <EditableInput
        id="cooking-time-input"
        label="Tiempo de horneado en minutos"
        type="number"
        value={recipeData.bakingInstructions?.time?.toString() ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            bakingInstructions: {
              ...recipeData.bakingInstructions,
              time: parseInt(newValue, 10),
            },
          })
        }
      />

      {(recipeData.subrecipes ?? []).map((subrecipe, index) => {
        return (
          <div key={index}>
            {subrecipe.title && <h3>{subrecipe.title}</h3>}
            {subrecipe.ingredients.map((ingredient, ingredientIndex) => (
              <MultipleEditableFields
                key={`ingredient-${ingredientIndex}`}
                singleLabel={`Ingrediente ${ingredientIndex + 1}`}
                fields={[
                  {
                    key: "name",
                    label: "Ingrediente",
                    value: ingredient.name ?? "",
                    component: "input",
                  },
                  {
                    key: "amount",
                    label: "Cantidad",
                    value: ingredient.amount?.toString() ?? "",
                    component: "input",
                    type: "number",
                  },
                  {
                    key: "unit",
                    label: "Unidad",
                    value: ingredient.unit ?? "",
                    component: "select",
                    options: [
                      { value: "g", label: "g" },
                      { value: "kg", label: "kg" },
                      { value: "cdas", label: "cdas" },
                      { value: "cditas", label: "cditas" },
                      { value: "ml", label: "ml" },
                      { value: "unidades", label: "unidades" },
                      { value: "c/n", label: "c/n" },
                    ],
                  },
                ]}
                onChange={(updatedFields) => {
                  const updatedIngredients = [...subrecipe.ingredients];
                  updatedIngredients[ingredientIndex] = {
                    ...updatedIngredients[ingredientIndex],
                    name: updatedFields.name ?? ingredient.name,
                    amount:
                      updatedFields.amount !== undefined
                        ? parseFloat(updatedFields.amount)
                        : ingredient.amount,
                    unit: updatedFields.unit ?? ingredient.unit,
                  };

                  const updatedSubrecipes = [...recipeData.subrecipes];
                  updatedSubrecipes[index] = {
                    ...subrecipe,
                    ingredients: updatedIngredients,
                  };

                  onChange({ ...recipeData, subrecipes: updatedSubrecipes });
                }}
              />
            ))}

            <EditableTextarea
              id={`instructions-${subrecipe.title || ""}`}
              label={`Instrucciones: ${
                subrecipe.title || `Subreceta ${index + 1}`
              }`}
              showLabel
              value={subrecipe.instructions?.join("\n") ?? ""}
              onChange={(newValue) => {
                const updatedSubrecipes = [...recipeData.subrecipes];
                updatedSubrecipes[index] = {
                  ...subrecipe,
                  instructions: newValue
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                };
                onChange({ ...recipeData, subrecipes: updatedSubrecipes });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RecipePreview;
