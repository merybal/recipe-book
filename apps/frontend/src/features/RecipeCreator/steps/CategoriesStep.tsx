import Chip from "@/design-system/components/Chip";
import ChipInput from "@/design-system/components/ChipInput";
import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import RadioGroup from "@/design-system/components/RadioGroup";
import Select from "@/design-system/components/Select";
import Separator from "@/design-system/components/Separator";

import type { RecipeStateType, ErrorStateType } from "@/types";
import type { FoodAllergyType } from "@/types";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

const MAX_SUBCATEGORIES = 3;

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
      subcategories: undefined,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.category;
      delete next.subcategories;
      return next;
    });
  };

  const subcategories = recipe.subcategories ?? [];

  const handleSubcategoryChange = (index: number, value: string) => {
    setRecipe((prev) => {
      const next = [...(prev.subcategories ?? [])];
      next[index] = value;
      return { ...prev, subcategories: next };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.subcategories;
      return next;
    });
  };

  const handleAddSubcategory = () => {
    setRecipe((prev) => {
      const current = prev.subcategories ?? [];
      const next = current.length === 0 ? ["", ""] : [...current, ""];
      return { ...prev, subcategories: next };
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    setRecipe((prev) => {
      const next = (prev.subcategories ?? []).filter((_, i) => i !== index);
      return { ...prev, subcategories: next };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.subcategories;
      return next;
    });
  };

  const subcategoryOptions =
    recipe.category === "salado"
      ? SUBCATEGORY_OPTIONS_SALADO
      : recipe.category === "dulce"
        ? SUBCATEGORY_OPTIONS_DULCE
        : [...SUBCATEGORY_OPTIONS_SALADO, ...SUBCATEGORY_OPTIONS_DULCE];

  const foodAllergies = recipe.foodAllergies ?? [];
  const subcategoriesToShow = subcategories.length > 0 ? subcategories : [""];

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

        <div className={styles["subcategory-container"]}>
          {subcategoriesToShow.map((sub, index) => {
            const otherSelected = subcategoriesToShow.filter(
              (_, j) => j !== index,
            );
            const optionsForSelect = subcategoryOptions.filter(
              (opt) => opt.value === sub || !otherSelected.includes(opt.value),
            );
            return (
              <div key={index} className={styles["subcategory-item"]}>
                <Select
                  id={`subcategory-${index}`}
                  label={
                    subcategoriesToShow.length === 1
                      ? "Subcategoría"
                      : "Subcategorías"
                  }
                  options={optionsForSelect}
                  placeholder="Seleccionar subcategoría"
                  showLabel={index === 0}
                  value={sub}
                  disabled={!recipe.category}
                  onChange={(e) =>
                    handleSubcategoryChange(index, e.target.value)
                  }
                  {...(errors.subcategories && {
                    error: errors.subcategories,
                  })}
                />
                {subcategoriesToShow.length > 1 && (
                  <ButtonIcon
                    className={styles["subcategory-remove-button"]}
                    disruptive
                    icon="Trash2"
                    label="Eliminar subcategoría"
                    size="small"
                    variant="secondary"
                    onClick={() => handleRemoveSubcategory(index)}
                  />
                )}
              </div>
            );
          })}
          {subcategories.length < MAX_SUBCATEGORIES && (
            <Button
              type="button"
              label="Agregar subcategoría"
              iconLeft="Plus"
              variant="secondary"
              disabled={!recipe.category}
              onClick={handleAddSubcategory}
            />
          )}
        </div>
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
