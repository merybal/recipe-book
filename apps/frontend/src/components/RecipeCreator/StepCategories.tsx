import Select from "@/design-system/src/components/Select";
import Checkbox from "@/design-system/src/components/Checkbox/Checkbox";
import ChipInput from "@/design-system/src/components/ChipInput";

import type { RecipeStateType, ErrorStateType } from "@/types";
import type { FoodAllergyType } from "@/types";

import styles from "./RecipeForm.module.scss";

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

type StepCategoriesProps = RecipeStateType & ErrorStateType;

const StepCategories = ({
  errors,
  recipe,
  setErrors,
  setRecipe,
}: StepCategoriesProps) => {
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

  const handleFoodAllergyChange = (value: FoodAllergyType, checked: boolean) => {
    setRecipe((prev) => {
      const current = prev.foodAllergies ?? [];
      const next = checked
        ? [...current, value]
        : current.filter((a) => a !== value);
      return { ...prev, foodAllergies: next };
    });
  };

  return (
    <div className={styles.step}>
      <h2>Categoría</h2>
      <Select
        id="category"
        label="Categoría de receta"
        options={[...CATEGORY_OPTIONS]}
        placeholder="Seleccionar categoría"
        showLabel
        value={recipe.category ?? ""}
        onChange={handleCategoryChange}
        {...(errors.category && { error: errors.category })}
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

      <fieldset className={styles["fieldset-categories"]}>
        <legend className={styles["legend-categories"]}>
          Alergias alimentarias
        </legend>
        {FOOD_ALLERGY_OPTIONS.map(({ value, label }) => (
          <Checkbox
            key={value}
            id={`food-allergy-${value}`}
            label={label}
            checked={foodAllergies.includes(value)}
            onChange={(e) =>
              handleFoodAllergyChange(value, e.target.checked)
            }
          />
        ))}
      </fieldset>

      <ChipInput
        id="tags"
        label="Etiquetas"
        placeholder="Agregar etiqueta (Enter o coma)"
        value={recipe.tags ?? []}
        onChange={(tags) => setRecipe((prev) => ({ ...prev, tags }))}
        showLabel
      />
    </div>
  );
};

export default StepCategories;
