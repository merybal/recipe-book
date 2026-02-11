import Input from "@/design-system/components/Input";
import Separator from "@/design-system/components/Separator";

import type { RecipeStateType, ErrorStateType } from "@/types";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

type BasicInformationStepProps = RecipeStateType & ErrorStateType;

const BasicInformationStep = ({
  errors,
  recipe,
  setErrors,
  setRecipe,
}: BasicInformationStepProps) => {
  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipe((prev) => ({
      ...prev,
      servings: value,
    }));
  };

  const handleMoldTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe((prev) => ({
      ...prev,
      mold: {
        ...prev.mold,
        type: e.target.value,
      },
    }));
  };

  const handleMoldSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe((prev) => ({
      ...prev,
      mold: {
        ...prev.mold,
        size: e.target.value,
      },
    }));
  };

  const validateOptionalNumber = (
    input: string,
    field: "temperature" | "time",
  ) => {
    const isValidNumber = /^[1-9]\d*$/.test(input); // números enteros > 0

    if (input === "") {
      setRecipe((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _removed, ...restBakingInstructions } =
          prev.bakingInstructions || {};
        return {
          ...prev,
          bakingInstructions:
            Object.keys(restBakingInstructions).length > 0
              ? restBakingInstructions
              : undefined,
        };
      });

      setErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [field]: _removed, ...rest } = prev;
        return rest;
      });
      return;
    }

    if (!isValidNumber) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Debe ser un número entero positivo mayor a 0",
      }));
      return;
    }

    const value = Number(input);

    setRecipe((prev) => ({
      ...prev,
      bakingInstructions: {
        ...(prev.bakingInstructions || {}),
        [field]: value,
      },
    }));

    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateOptionalNumber(e.target.value, "temperature");
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateOptionalNumber(e.target.value, "time");
  };

  return (
    <div>
      <section aria-labelledby="servings-section" className={styles.step}>
        <Input
          id="servings"
          label="Rinde"
          showLabel
          placeholder="4 porciones"
          value={recipe.servings ?? ""}
          onChange={handleServingsChange}
        />
      </section>

      <Separator />

      <section aria-labelledby="mold-section" className={styles.step}>
        <h2 id="mold-section">Molde</h2>
        <Input
          id="mold-type"
          label="Tipo"
          showLabel
          placeholder="Budinera"
          value={recipe.mold?.type || ""}
          onChange={handleMoldTypeChange}
        />

        <Input
          id="mold-size"
          label="Tamaño"
          showLabel
          placeholder="24x30 cm"
          value={recipe.mold?.size || ""}
          onChange={handleMoldSizeChange}
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
          inputMode="numeric"
          label="Temperatura en Celcius (°C)"
          showLabel
          pattern="[0-9]*"
          placeholder="180"
          type="text"
          value={
            recipe.bakingInstructions?.temperature !== undefined
              ? recipe.bakingInstructions.temperature.toString()
              : ""
          }
          onChange={handleTemperatureChange}
          {...(errors.temperature && { error: errors.temperature })}
        />

        <Input
          id="time"
          inputMode="numeric"
          label="Tiempo en minutos"
          showLabel
          pattern="[0-9]*"
          placeholder="45"
          type="text"
          value={
            recipe.bakingInstructions?.time !== undefined
              ? recipe.bakingInstructions.time.toString()
              : ""
          }
          onChange={handleTimeChange}
          {...(errors.time && { error: errors.time })}
        />
      </section>
    </div>
  );
};

export default BasicInformationStep;
