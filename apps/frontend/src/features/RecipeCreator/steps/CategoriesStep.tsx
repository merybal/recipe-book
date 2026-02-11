import Chip from "@/design-system/components/Chip";
import ChipInput from "@/design-system/components/ChipInput";
import RadioGroup from "@/design-system/components/RadioGroup";
import Select from "@/design-system/components/Select";
import Separator from "@/design-system/components/Separator";

import type { RecipeStateType, ErrorStateType } from "@/types";
import type { FoodAllergyType } from "@/types";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

const FOOD_ALLERGY_OPTIONS: { value: FoodAllergyType; label: string }[] = [
  { value: "glutenFree", label: "Sin gluten" },
  { value: "dairyFree", label: "Sin lactosa" },
  { value: "vegetarian", label: "Vegetariano" },
  { value: "vegan", label: "Vegano" },
];

const CATEGORY_OPTIONS = [
  { value: "salado", label: "Salado" },
  { value: "dulce", label: "Dulce" },
] as const;

const SUBCATEGORY_OPTIONS_SALADO = [
  { value: "tarta", label: "Tarta" },
  { value: "arroz", label: "Arroz" },
  { value: "carne", label: "Carne" },
  { value: "pollo", label: "Pollo" },
  { value: "cerdo", label: "Cerdo" },
];

const SUBCATEGORY_OPTIONS_DULCE = [
  { value: "muffin", label: "Muffin" },
  { value: "torta", label: "Torta" },
  { value: "helado", label: "Helado" },
  { value: "cookie", label: "Cookie" },
  { value: "scon", label: "Scon" },
];

type CategoriesStepProps = RecipeStateType & ErrorStateType;

const CategoriesStep = ({
  errors,
  recipe,
  setErrors,
  setRecipe,
}: CategoriesStepProps) => {
  const handleCategoryChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setRecipe((prev) => ({
      ...prev,
      category: value,
      subcategory: undefined,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.category;
      delete next.subcategory;
      return next;
    });
  };

  const handleSubcategoryChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setRecipe((prev) => ({ ...prev, subcategory: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.subcategory;
      return next;
    });
  };

  const subcategoryOptions =
    recipe.category === "salado"
      ? SUBCATEGORY_OPTIONS_SALADO
      : recipe.category === "dulce"
        ? SUBCATEGORY_OPTIONS_DULCE
        : [];

  const foodAllergies = recipe.foodAllergies ?? [];

  const handleFoodAllergiesChange = (selectedValues: string[]) => {
    setRecipe((prev) => ({
      ...prev,
      foodAllergies: selectedValues as FoodAllergyType[],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.foodAllergies;
      return next;
    });
  };

  return (
    <>
      <section aria-labelledby="categories-section" className={styles.step}>
        <h2 id="categories-section">Categoría</h2>
        <RadioGroup
          name="category"
          label="Categoría de receta"
          options={[...CATEGORY_OPTIONS]}
          value={recipe.category ?? ""}
          onChange={handleCategoryChange}
          error={errors.category}
          required
        />

        {subcategoryOptions.length > 0 && (
          <Select
            id="subcategory"
            label="Subcategoría"
            options={subcategoryOptions}
            placeholder="Seleccionar subcategoría"
            showLabel
            value={recipe.subcategory ?? ""}
            onChange={handleSubcategoryChange}
            {...(errors.subcategory && { error: errors.subcategory })}
          />
        )}
      </section>

      <Separator />

      <div className={styles["fieldset-categories"]}>
        <label
          className={styles["legend-categories"]}
          id="food-allergies-label"
        >
          Alergias alimentarias
        </label>
        <div className={styles["chips-container"]}>
          {FOOD_ALLERGY_OPTIONS.map((option) => {
            const isSelected = foodAllergies.includes(option.value);
            return (
              <Chip
                key={option.value}
                selected={isSelected}
                onClick={() => {
                  const newValues = isSelected
                    ? foodAllergies.filter((v) => v !== option.value)
                    : [...foodAllergies, option.value];
                  handleFoodAllergiesChange(newValues);
                }}
              >
                {option.label}
              </Chip>
            );
          })}
        </div>
        {errors.foodAllergies && (
          <p className={styles["error-message"]} role="alert">
            {errors.foodAllergies}
          </p>
        )}
      </div>

      <Separator />

      <ChipInput
        id="tags"
        label="Etiquetas"
        placeholder="Agregar etiqueta (Enter o coma)"
        value={recipe.tags ?? []}
        onChange={(tags) => setRecipe((prev) => ({ ...prev, tags }))}
        showLabel
      />
    </>
  );
};

export default CategoriesStep;
