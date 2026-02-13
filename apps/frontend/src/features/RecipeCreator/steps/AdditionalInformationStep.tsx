import clsx from "clsx";

import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import Select from "@/design-system/components/Select";
import Separator from "@/design-system/components/Separator";
import Textarea from "@/design-system/components/Textarea";

import type { RecipeStateType, ErrorStateType } from "@/types";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

const MAX_TIPS = 6;

const COUNTRY_OPTIONS = [
  { value: "", label: "Seleccionar país" },
  { value: "argentina", label: "Argentina" },
  { value: "españa", label: "España" },
  { value: "mexico", label: "México" },
  { value: "italia", label: "Italia" },
  { value: "francia", label: "Francia" },
  { value: "peru", label: "Perú" },
  { value: "colombia", label: "Colombia" },
  { value: "chile", label: "Chile" },
  { value: "uruguay", label: "Uruguay" },
  { value: "otro", label: "Otro" },
];

type AdditionalInformationStepProps = RecipeStateType & ErrorStateType;

const AdditionalInformationStep = ({
  recipe,
  setRecipe,
  setErrors,
}: AdditionalInformationStepProps) => {
  const tips = recipe.tips ?? [];

  const handleTipChange = (index: number, value: string) => {
    setRecipe((prev) => {
      const nextTips = [...(prev.tips ?? [])];
      nextTips[index] = value;
      return { ...prev, tips: nextTips };
    });
  };

  const handleAddTip = () => {
    setRecipe((prev) => {
      const current = prev.tips ?? [];
      if (current.length >= MAX_TIPS) return prev;
      const next = current.length === 0 ? ["", ""] : [...current, ""];
      return { ...prev, tips: next };
    });
  };

  const handleRemoveTip = (index: number) => {
    setRecipe((prev) => {
      const nextTips = (prev.tips ?? []).filter((_, i) => i !== index);
      return { ...prev, tips: nextTips };
    });
  };

  const handleCountryChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setRecipe((prev) => ({
      ...prev,
      countryOfOrigin: value || undefined,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.countryOfOrigin;
      return next;
    });
  };

  const tipsToShow = tips.length > 0 ? tips : [""];

  return (
    <div>
      <section aria-labelledby="tips-section">
        <header>
          <h2 id="tips-section">Notas</h2>
          <p className={styles["tips-step-helper"]}>
            Agregá acá las notas o tips que quieras (sobre cocción, reemplazo de
            ingredientes, etc.) a la receta.
          </p>
        </header>
        <div className={styles["tips-container"]}>
          {tipsToShow.map((tip, index) => (
            <div
              key={index}
              className={clsx(
                styles["tip-item"],
                index === 0 && styles["tip-item--first"],
              )}
            >
              <Textarea
                id={`tip-${index}`}
                label={tipsToShow.length === 1 ? "Nota" : "Notas"}
                rows={3}
                showLabel={index === 0}
                value={tip}
                onChange={(e) => handleTipChange(index, e.target.value)}
              />
              {tipsToShow.length > 1 && (
                <ButtonIcon
                  className={styles["tip-remove-button"]}
                  disruptive
                  icon="Trash2"
                  label="Eliminar nota"
                  size="small"
                  variant="secondary"
                  onClick={() => handleRemoveTip(index)}
                />
              )}
            </div>
          ))}
          {tips.length < MAX_TIPS && (
            <Button
              type="button"
              label="Agregar nota"
              iconLeft="Plus"
              variant="secondary"
              onClick={handleAddTip}
            />
          )}
        </div>
      </section>
      <Separator />
      <section
        aria-labelledby="country-of-origin-section"
        className={styles.step}
      >
        <h2 id="country-of-origin-section">País de origen</h2>
        <Select
          id="country-of-origin"
          label="País"
          showLabel
          placeholder="Seleccionar país"
          options={COUNTRY_OPTIONS}
          value={recipe.countryOfOrigin ?? ""}
          onChange={handleCountryChange}
        />
      </section>
    </div>
  );
};

export default AdditionalInformationStep;
