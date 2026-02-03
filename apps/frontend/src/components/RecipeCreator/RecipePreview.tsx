import type { RecipeType } from "@/types";

import clsx from "clsx";
import styles from "./RecipePreview.module.scss";
import EditableInput from "../../design-system/src/components/EditableInput/EditableInput";
import MultipleEditableFields from "@/design-system/src/components/MultipleEditableFields";
import EditableTextarea from "@/design-system/src/components/EditableTextarea";

export type RecipePreviewProps = {
  className?: string;
  recipeData: RecipeType;
  onChange: (updatedRecipe: RecipeType) => void;
};

const RecipePreview = ({
  className,
  recipeData,
  onChange,
}: RecipePreviewProps) => {
  console.log("recipeData", recipeData);

  return (
    <div className={clsx(styles["recipe-preview"], className)}>
      <EditableInput
        id="title-input"
        label="Titulo"
        required
        value={recipeData.title}
        onChange={(newTitle) => onChange({ ...recipeData, title: newTitle })}
      />

      <EditableInput
        id="serves-input"
        label="Rinde (porciones)"
        value={recipeData.servings ?? ""}
        onChange={(newValue) => onChange({ ...recipeData, servings: newValue })}
      />

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

      {recipeData.subrecipes.map((subrecipe, index) => {
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
