import Input from "@/design-system/components/Input";
import Textarea from "@/design-system/components/Textarea";
import Separator from "@/design-system/components/Separator";
import Button from "@/design-system/components/Button";

import type {
  RecipeStateType,
  IngredientType,
  SubrecipeDraftType,
} from "@/types";

import { parseIngredientsText } from "@/utils/idml-file-uploader-utils";

import styles from "@/features/RecipeCreator/RecipeForm.module.scss";

type SimpleRecipeDraft = {
  ingredientsText: string;
  ingredients: IngredientType[];
  instructionsText: string;
  instructions: string[];
};

type StepSubrecipesProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  subrecipeDrafts: SubrecipeDraftType[];
  setSubrecipeDrafts: React.Dispatch<
    React.SetStateAction<SubrecipeDraftType[]>
  >;
  simpleRecipeDraft: SimpleRecipeDraft;
  setSimpleRecipeDraft: React.Dispatch<React.SetStateAction<SimpleRecipeDraft>>;
} & RecipeStateType;

const StepSubrecipes = ({
  isChecked,
  setIsChecked,
  subrecipeDrafts,
  setSubrecipeDrafts,
  simpleRecipeDraft,
  setSimpleRecipeDraft,
}: StepSubrecipesProps) => {
  const handleSeparateIntoPreparations = () => {
    setIsChecked(true);
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
    setIsChecked(false);
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
            ingredients: parseIngredientsText(value),
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

  const subrecipeInputs = (
    <div className={styles.step}>
      <Textarea
        id="simple-ingredients"
        label="Ingredientes"
        required
        rows={5}
        showLabel
        value={simpleRecipeDraft.ingredientsText}
        onChange={(e) => {
          const text = e.target.value;
          const parsedIngredients = parseIngredientsText(text);
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
    </div>
  );

  return (
    <section aria-labelledby="subrecipes-section" className={styles.step}>
      <h2 id="subrecipes-section">Preparaciones</h2>

      <Button
        type="button"
        label={
          isChecked
            ? "Volver a una sola preparación"
            : "Separar receta en preparaciones"
        }
        variant="secondary"
        onClick={
          isChecked ? handleUniteIntoOne : handleSeparateIntoPreparations
        }
      />
      {!isChecked && (
        <p className={styles["step-helper"]}>
          Permite agregar una sección de ingredientes e instrucciones para cada
          preparación.
        </p>
      )}

      {isChecked ? (
        <>
          {subrecipeDrafts.map((draft, index) => (
            <div key={index}>
              <div className={styles.step}>
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
                <Textarea
                  id={`subrecipe-${index}-ingredients`}
                  label="Ingredientes"
                  required
                  rows={5}
                  showLabel
                  value={subrecipeDrafts[index].ingredientsText || ""}
                  onChange={(e) => {
                    const text = e.target.value;
                    const parsedIngredients = parseIngredientsText(text);
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
              </div>
              {index < subrecipeDrafts.length - 1 && <Separator />}
            </div>
          ))}
          <Button
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

export default StepSubrecipes;
