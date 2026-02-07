import Input from "@/design-system/src/components/Input";
import Checkbox from "@/design-system/src/components/Checkbox/Checkbox";
import Textarea from "@/design-system/src/components/Textarea";
import Separator from "@/design-system/src/components/Separator";
import Button from "@/design-system/src/components/Button";

import type {
  RecipeStateType,
  IngredientType,
  SubrecipeDraftType,
} from "@/types";

import { parseIngredientsText } from "@/utils/idml-file-uploader-utils";

import styles from "./RecipeForm.module.scss";

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
  const handleCheckboxChange = () => {
    setIsChecked((prev) => {
      const next = !prev;
      if (next && subrecipeDrafts.length === 0) {
        setSubrecipeDrafts([
          {
            title: "",
            ingredientsText: "",
            ingredients: [],
            instructionsText: "",
            instructions: [],
          },
        ]);
      }
      return next;
    });
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
    <>
      <Checkbox
        id="terms"
        label="Dividir receta en preparaciones"
        checked={isChecked}
        onChange={handleCheckboxChange}
        helper="Permite agregar una sección de ingredientes e instrucciones para cada preparación"
      />

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
    </>
  );
};

export default StepSubrecipes;
