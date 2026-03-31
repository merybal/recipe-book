import { useEffect, useState } from "react";
import axios from "axios";

import type { RecipeType, SubrecipeType, UnitRaw } from "@/types";
import { formatAmountForDisplay } from "@/utils/idml-file-uploader-utils";
import { normalizeUnit } from "@/utils/unit-abbreviation";

import styles from "./RecipePrintPreview.module.scss";

const SHOW_STEP_NUMBERS = false;

type RecipePrintPreviewProps = {
  recipe: RecipeType;
};

function formatIngredient(
  ing: { name: string; amount?: number | null; unit?: string | null },
  units: UnitRaw[],
) {
  const unitStr = ing.unit ?? "";
  const unitDisplay =
    unitStr !== ""
      ? ing.amount != null
        ? normalizeUnit(unitStr, ing.amount, units)
        : unitStr
      : "";
  const amountPart =
    ing.amount != null
      ? `${formatAmountForDisplay(ing.amount)} ${unitDisplay}`.trim()
      : unitDisplay
        ? String(unitDisplay)
        : "";
  return amountPart ? `${ing.name}, ${amountPart}` : ing.name;
}

function formatBakingInfo(recipe: RecipeType) {
  if (!recipe.bakingInstructions) return null;
  const parts = [
    recipe.bakingInstructions.time,
    recipe.bakingInstructions.temperature && `${recipe.bakingInstructions.temperature}°C`,
  ].filter(Boolean);
  return parts.length ? parts.join(" • ") : null;
}

function formatSource(recipe: RecipeType) {
  if (!recipe.source) return null;
  const name = recipe.source.name?.filter(Boolean).join(", ");
  const url = recipe.source.url?.filter(Boolean).join(", ");
  return name || url || null;
}

function InfoSection({ recipe }: { recipe: RecipeType }) {
  const hasInfo =
    recipe.bakingInstructions ||
    recipe.mold ||
    recipe.servings ||
    (recipe.source && (recipe.source.name?.length || recipe.source.url?.length));

  if (!hasInfo) return null;

  return (
    <section className={styles.section}>
      {recipe.bakingInstructions && formatBakingInfo(recipe) && (
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Cocción:</span>
          <span>{formatBakingInfo(recipe)}</span>
        </div>
      )}
      {recipe.mold && (recipe.mold.type || recipe.mold.size) && (
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Molde:</span>
          <span>{[recipe.mold.type, recipe.mold.size].filter(Boolean).join(" - ")}</span>
        </div>
      )}
      {recipe.servings && (
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Rinde:</span>
          <span>{recipe.servings}</span>
        </div>
      )}
      {formatSource(recipe) && (
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Fuente:</span>
          <span>{formatSource(recipe)}</span>
        </div>
      )}
    </section>
  );
}

function IngredientsSection({
  subrecipes,
  units,
}: {
  subrecipes: SubrecipeType[];
  units: UnitRaw[];
}) {
  const withIngredients = subrecipes.filter(
    (s) => s.ingredients && s.ingredients.length > 0,
  );
  if (withIngredients.length === 0) return null;

  // Only one subrecipe has ingredients: two columns, no subsection titles
  if (withIngredients.length === 1) {
    const ingredients = withIngredients[0].ingredients || [];
    const mid = Math.ceil(ingredients.length / 2);
    const left = ingredients.slice(0, mid);
    const right = ingredients.slice(mid);

    return (
      <section
        className={styles.sectionWithDivider}
        data-section="ingredients"
      >
        <h2 className={styles.sectionTitle}>Ingredientes</h2>
        <div className={styles.ingredientColumns}>
          <div className={styles.ingredientColumn}>
            <ul className={styles.ingredientList}>
              {left.map((ing, i) => (
                <li key={i} className={styles.ingredientLine}>
                  {formatIngredient(ing, units)}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ingredientColumn}>
            <ul className={styles.ingredientList}>
              {right.map((ing, i) => (
                <li key={i} className={styles.ingredientLine}>
                  {formatIngredient(ing, units)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.sectionWithDivider}
      data-section="ingredients"
    >
      <h2 className={styles.sectionTitle}>Ingredientes</h2>
      <div className={styles.ingredientColumns}>
        {withIngredients.map((subrecipe, idx) => (
          <div key={idx} className={styles.ingredientColumn}>
            {subrecipe.title && (
              <h3 className={styles.subsectionTitle}>{subrecipe.title}</h3>
            )}
            <ul className={styles.ingredientList}>
              {subrecipe.ingredients!.map((ing, i) => (
                <li key={i} className={styles.ingredientLine}>
                  {formatIngredient(ing, units)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function InstructionsSection({ subrecipes }: { subrecipes: SubrecipeType[] }) {
  const hasInstructions = subrecipes.some(
    (s) => s.instructions && s.instructions.length > 0
  );
  if (!hasInstructions) return null;

  return (
    <section
      className={styles.sectionWithDivider}
      data-section="preparation"
    >
      <h2 className={styles.sectionTitle}>Preparación</h2>
      {subrecipes.map((subrecipe, idx) => (
        <div key={idx} className={styles.subrecipeBlock}>
          {subrecipe.title && (
            <h3 className={styles.subsectionTitle}>{subrecipe.title}</h3>
          )}
          {subrecipe.instructions && subrecipe.instructions.length > 0 && (
            <ol className={styles.instructionList}>
              {subrecipe.instructions.map((step, i) => (
                <li key={i} className={styles.instructionStep}>
                  {SHOW_STEP_NUMBERS && (
                    <span className={styles.instructionNumber}>{i + 1}.</span>
                  )}
                  <span className={styles.instructionText}>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </section>
  );
}

function NotesSection({ notes }: { notes: string[] }) {
  if (!notes.length) return null;

  return (
    <section
      className={styles.sectionWithDivider}
      data-section="notes"
    >
      <h2 className={styles.sectionTitle}>Notas</h2>
      <ul className={styles.notesList}>
        {notes.map((note, i) => (
          <li key={i} className={styles.note}>
            • {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RecipePrintPreview({ recipe }: RecipePrintPreviewProps) {
  const [units, setUnits] = useState<UnitRaw[]>([]);

  useEffect(() => {
    axios
      .get<UnitRaw[]>("/api/units?locale=es")
      .then((res) => setUnits(res.data))
      .catch(() => setUnits([]));
  }, []);

  return (
    <div className={styles.page} data-pdf-measure="page">
      <h1 className={styles.title}>{recipe.title}</h1>

      <InfoSection recipe={recipe} />

      <IngredientsSection subrecipes={recipe.subrecipes} units={units} />

      <InstructionsSection subrecipes={recipe.subrecipes} />

      {recipe.notes && recipe.notes.length > 0 && (
        <NotesSection notes={recipe.notes} />
      )}
    </div>
  );
}
