import Input from "@/design-system/src/components/Input";
import Separator from "@/design-system/src/components/Separator";

import type { RecipeStateType } from "@/types";

import styles from "./RecipeForm.module.scss";

type MoldAndBakingInstructionsStepProps = RecipeStateType;

const MoldAndBakingInstructionsStep = ({
  recipe,
  setRecipe,
}: MoldAndBakingInstructionsStepProps) => {
  return (
    <div>
      <section aria-labelledby="mold-section" className={styles.step}>
        <h2 id="mold-section">Molde</h2>
        <Input
          id="mold-type"
          label="Tipo"
          showLabel
          placeholder="Budinera"
          value={recipe.mold?.type || ""}
          onChange={(e) =>
            setRecipe((prev) => ({
              ...prev,
              mold: {
                ...prev.mold,
                type: e.target.value,
              },
            }))
          }
        />

        <Input
          id="mold-size"
          label="Tamaño"
          showLabel
          placeholder="24x30 cm"
          value={recipe.mold?.size || ""}
          onChange={(e) =>
            setRecipe((prev) => ({
              ...prev,
              mold: {
                ...prev.mold,
                size: e.target.value,
              },
            }))
          }
        />
      </section>

      <Separator />

      <section
        aria-labelledby="baking-instructions-section"
        className={styles.step}
      >
        <h2 id="baking-instructions-section">Cocción</h2>
        <Input
          id="temperature"
          label="Temperatura en Celcius (°C)"
          showLabel
          placeholder="180"
          type="number"
          value={recipe.bakingInstructions?.temperature || ""}
          onChange={(e) =>
            setRecipe((prev) => ({
              ...prev,
              bakingInstructions: {
                ...prev.bakingInstructions,
                temperature: Number(e.target.value),
              },
            }))
          }
        />

        <Input
          id="time"
          label="Tiempo en minutos"
          showLabel
          placeholder="45"
          type="number"
          value={recipe.bakingInstructions?.time || ""}
          onChange={(e) =>
            setRecipe((prev) => ({
              ...prev,
              bakingInstructions: {
                ...prev.bakingInstructions,
                time: Number(e.target.value),
              },
            }))
          }
        />
      </section>
    </div>
  );
};

export default MoldAndBakingInstructionsStep;
