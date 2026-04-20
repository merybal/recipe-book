/**
 * Subrecipes step flow:
 * - Initial state: "Separate recipe into preparations" button, helper text,
 *   and one set of ingredients + instructions (no title).
 * - On button click: title field is added to that set, "Add preparation" button
 *   appears to add more sets, and trash button on each set (trash only visible
 *   when there are 2+ sets).
 * - When deleting all sets except one: returns to initial state (simple mode)
 *   with "Separate..." button, helper text, and the set without title.
 */
import clsx from "clsx";
import Box from "@/design-system/components/Box";
import Input from "@/design-system/components/Input";
import Textarea from "@/design-system/components/Textarea";
import Separator from "@/design-system/components/Separator";
import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";

import type {
  RecipeStateType,
  IngredientType,
  SubrecipeDraftType,
  UnitRaw,
} from "@/types";

import { parseIngredientsText } from "@/utils/idml-file-uploader-utils";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

type SimpleRecipeDraft = {
  ingredientsText: string;
  ingredients: IngredientType[];
  instructionsText: string;
  instructions: string[];
};

type SubrecipesStepProps = {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  subrecipeDrafts: SubrecipeDraftType[];
  setSubrecipeDrafts: React.Dispatch<
    React.SetStateAction<SubrecipeDraftType[]>
  >;
  simpleRecipeDraft: SimpleRecipeDraft;
  setSimpleRecipeDraft: React.Dispatch<React.SetStateAction<SimpleRecipeDraft>>;
  units: UnitRaw[];
} & RecipeStateType;

const SubrecipesStep = ({
  isSelected,
  setIsSelected,
  subrecipeDrafts,
  setSubrecipeDrafts,
  simpleRecipeDraft,
  setSimpleRecipeDraft,
  units,
}: SubrecipesStepProps) => {
  const handleSeparateIntoPreparations = () => {
    setIsSelected(true);
    setSubrecipeDrafts([
      {
        title: "",
        ingredientsText: simpleRecipeDraft.ingredientsText,
        ingredients: simpleRecipeDraft.ingredients,
        instructionsText: simpleRecipeDraft.instructionsText,
        instructions: simpleRecipeDraft.instructions,
      },
    ]);
  };

  const handleUniteIntoOne = () => {
    const partsIng = subrecipeDrafts
      .map((d) => d.ingredientsText.trim())
      .filter(Boolean);
    const partsInstr = subrecipeDrafts
      .map((d) => d.instructionsText.trim())
      .filter(Boolean);
    setSimpleRecipeDraft({
      ingredientsText: partsIng.join("\n"),
      ingredients: subrecipeDrafts.flatMap((d) => d.ingredients),
      instructionsText: partsInstr.join("\n"),
      instructions: subrecipeDrafts.flatMap((d) => d.instructions),
    });
    setSubrecipeDrafts([]);
    setIsSelected(false);
  };

  const handleSubrecipeChange = (
    index: number,
    field: keyof SubrecipeDraftType,
    value: string,
  ) => {
    setSubrecipeDrafts((prev) =>
      prev.map((draft, i) => {
        if (i !== index) return draft;

        if (field === "ingredientsText") {
          return {
            ...draft,
            ingredientsText: value,
            ingredients: parseIngredientsText(value, units),
          };
        }

        if (field === "instructionsText") {
          return {
            ...draft,
            instructionsText: value,
            instructions: value
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
          };
        }

        return {
          ...draft,
          [field]: value,
        };
      }),
    );
  };

  const handleAddSubrecipe = () => {
    setSubrecipeDrafts((prev) => [
      ...prev,
      {
        title: "",
        ingredientsText: "",
        ingredients: [],
        instructionsText: "",
        instructions: [],
      },
    ]);
  };

  const handleRemoveSubrecipe = (index: number) => {
    const next = subrecipeDrafts.filter((_, i) => i !== index);
    if (next.length === 1) {
      const remaining = next[0];
      setSimpleRecipeDraft({
        ingredientsText: remaining.ingredientsText,
        ingredients: remaining.ingredients,
        instructionsText: remaining.instructionsText,
        instructions: remaining.instructions,
      });
      setSubrecipeDrafts([]);
      setIsSelected(false);
    } else {
      setSubrecipeDrafts(next);
    }
  };

  const subrecipeInputs = (
    <Box className={clsx(styles.step, styles["subrecipe-textarea-grid"])}>
      <Textarea
        id="simple-ingredients"
        label="Ingredientes"
        required
        rows={5}
        showLabel
        value={simpleRecipeDraft.ingredientsText}
        onChange={(e) => {
          const text = e.target.value;
          const parsedIngredients = parseIngredientsText(text, units);
          setSimpleRecipeDraft((prev) => ({
            ...prev,
            ingredientsText: text,
            ingredients: parsedIngredients,
          }));
        }}
      />
      <Textarea
        id="simple-instructions"
        label="Instrucciones"
        required
        rows={5}
        showLabel
        value={simpleRecipeDraft.instructionsText}
        onChange={(e) => {
          const text = e.target.value;
          setSimpleRecipeDraft((prev) => ({
            ...prev,
            instructionsText: text,
            instructions: text
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean),
          }));
        }}
      />
    </Box>
  );

  return (
    <section aria-labelledby="subrecipes-section">
      <h2 id="subrecipes-section" className={styles["subrecipe-step-title"]}>
        Preparación
      </h2>

      <div>
        <Button
          className={isSelected ? styles["subrecipe-button"] : ""}
          type="button"
          label={
            isSelected
              ? "Volver a una sola preparación"
              : "Separar receta en varias preparaciones"
          }
          variant="secondary"
          onClick={
            isSelected ? handleUniteIntoOne : handleSeparateIntoPreparations
          }
        />
        {!isSelected && (
          <p className={styles["step-helper"]}>
            Podés agregar una sección de ingredientes e instrucciones para cada
            preparación.
          </p>
        )}
      </div>

      {isSelected ? (
        <>
          {subrecipeDrafts.map((draft, index) => (
            <Box key={index}>
              <Box className={styles.step}>
                <Box className={styles["subrecipe-title-container"]}>
                  <Input
                    id={`subrecipe-title-${index}`}
                    label="Título de preparación"
                    required
                    showLabel
                    value={draft.title}
                    onChange={(e) =>
                      handleSubrecipeChange(index, "title", e.target.value)
                    }
                  />
                  {subrecipeDrafts.length > 1 && (
                    <ButtonIcon
                      className={styles["subrecipe-remove-button"]}
                      disruptive
                      icon="Trash2"
                      label="Eliminar preparación"
                      size="small"
                      variant="secondary"
                      onClick={() => handleRemoveSubrecipe(index)}
                    />
                  )}
                </Box>

                <Box className={styles["subrecipe-textarea-grid"]}>
                  <Textarea
                    id={`subrecipe-${index}-ingredients`}
                    label="Ingredientes"
                    required
                    rows={5}
                    showLabel
                    value={subrecipeDrafts[index].ingredientsText || ""}
                    onChange={(e) => {
                      const text = e.target.value;
                      const parsedIngredients = parseIngredientsText(
                        text,
                        units,
                      );
                      setSubrecipeDrafts((prev) =>
                        prev.map((draft, i) =>
                          i === index
                            ? {
                                ...draft,
                                ingredientsText: text,
                                ingredients: parsedIngredients,
                              }
                            : draft,
                        ),
                      );
                    }}
                  />
                  <Textarea
                    id={`instructions-subrecipe-${index}`}
                    label="Instrucciones"
                    required
                    rows={5}
                    showLabel
                    value={subrecipeDrafts[index].instructionsText}
                    onChange={(e) =>
                      handleSubrecipeChange(
                        index,
                        "instructionsText",
                        e.target.value,
                      )
                    }
                  />
                </Box>
              </Box>
              {index < subrecipeDrafts.length - 1 && <Separator />}
            </Box>
          ))}
          <Button
            className={styles["add-subrecipe-button"]}
            label="Agregar preparación"
            iconLeft="Plus"
            onClick={handleAddSubrecipe}
          />
        </>
      ) : (
        <>{subrecipeInputs}</>
      )}
    </section>
  );
};

export default SubrecipesStep;
