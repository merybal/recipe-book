import { useEffect, useState } from "react";
import axios from "axios";
import Chip from "@/design-system/components/Chip";
import ChipInput from "@/design-system/components/ChipInput";
import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import RadioGroup from "@/design-system/components/RadioGroup";
import Select from "@/design-system/components/Select";
import Separator from "@/design-system/components/Separator";

import type { RecipeStateType, ErrorStateType } from "@/types";
import type { DietaryRestrictionType } from "@/types";
import { useLocale } from "@/hooks/useLocale";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

const MAX_SUBCATEGORIES = 3;

const DIETARY_RESTRICTION_OPTIONS: {
  value: DietaryRestrictionType;
  label: string;
}[] = [
  { value: "glutenFree", label: "Sin gluten" },
  { value: "dairyFree", label: "Sin lactosa" },
  { value: "vegetarian", label: "Vegetariano" },
  { value: "vegan", label: "Vegano" },
];

type CategoryOption = { value: string; label: string };
type SubcategoryOption = { value: string; label: string };

type CategoriesStepProps = RecipeStateType & ErrorStateType;

type ApiItem = {
  id: number;
  name?: string;
  name_en?: string;
  name_es?: string;
};

function parseApiItems(data: unknown): ApiItem[] {
  if (Array.isArray(data)) return data;
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as { data: unknown }).data)
  ) {
    return (data as { data: ApiItem[] }).data;
  }
  return [];
}

function getLabel(item: ApiItem): string {
  return item.name ?? item.name_es ?? item.name_en ?? String(item.id);
}

const CategoriesStep = ({
  errors,
  recipe,
  setErrors,
  setRecipe,
}: CategoriesStepProps) => {
  const locale = useLocale();
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState<
    SubcategoryOption[]
  >([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [subcategoriesError, setSubcategoriesError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    axios
      .get(`/api/categories?locale=${locale}`)
      .then((res) => {
        const items = parseApiItems(res.data);
        setCategoryOptions(
          items.map((c) => ({ value: String(c.id), label: getLabel(c) })),
        );
      })
      .catch(() => {
        setCategoriesError("No se pudieron cargar las categorías");
      })
      .finally(() => setCategoriesLoading(false));
  }, [locale]);

  useEffect(() => {
    if (!recipe.categoryId) {
      setSubcategoryOptions([]);
      setSubcategoriesError(null);
      return;
    }
    setSubcategoriesLoading(true);
    setSubcategoriesError(null);
    axios
      .get(
        `/api/subcategories?locale=${locale}&category_id=${recipe.categoryId}`,
      )
      .then((res) => {
        const items = parseApiItems(res.data);
        setSubcategoryOptions(
          items.map((s) => ({ value: String(s.id), label: getLabel(s) })),
        );
      })
      .catch(() => {
        setSubcategoriesError("No se pudieron cargar las subcategorías");
      })
      .finally(() => setSubcategoriesLoading(false));
  }, [locale, recipe.categoryId]);

  const handleCategoryChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    const categoryId = value ? Number(value) : undefined;
    const categoryName = categoryId
      ? categoryOptions.find((o) => o.value === value)?.label
      : undefined;
    setRecipe((prev) => ({
      ...prev,
      categoryId,
      category: categoryName,
      subcategories: undefined,
      subcategoryIds: undefined,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.category;
      delete next.subcategories;
      return next;
    });
  };

  const subcategoryIds = recipe.subcategoryIds ?? [];

  const handleSubcategoryChange = (index: number, value: string) => {
    const id = value ? Number(value) : 0;
    setRecipe((prev) => {
      const next = [...(prev.subcategoryIds ?? [])];
      next[index] = id;
      const subcategoryNames = next
        .filter((sid) => sid > 0)
        .map(
          (sid) =>
            subcategoryOptions.find((o) => o.value === String(sid))?.label,
        )
        .filter(Boolean) as string[];
      return {
        ...prev,
        subcategoryIds: next,
        subcategories: subcategoryNames,
      };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.subcategories;
      return next;
    });
  };

  const handleAddSubcategory = () => {
    setRecipe((prev) => {
      const current = prev.subcategoryIds ?? [];
      const next = current.length === 0 ? [0, 0] : [...current, 0];
      return { ...prev, subcategoryIds: next };
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    setRecipe((prev) => {
      const next = (prev.subcategoryIds ?? []).filter((_, i) => i !== index);
      const subcategoryNames = next
        .filter((sid) => sid > 0)
        .map(
          (sid) =>
            subcategoryOptions.find((o) => o.value === String(sid))?.label,
        )
        .filter(Boolean) as string[];
      return { ...prev, subcategoryIds: next, subcategories: subcategoryNames };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.subcategories;
      return next;
    });
  };

  const dietaryRestrictions = recipe.dietaryRestrictions ?? [];
  const subcategoriesToShow = subcategoryIds.length > 0 ? subcategoryIds : [0];

  const handleDietaryRestrictionsChange = (selectedValues: string[]) => {
    setRecipe((prev) => ({
      ...prev,
      dietaryRestrictions: selectedValues as DietaryRestrictionType[],
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.dietaryRestrictions;
      return next;
    });
  };

  return (
    <>
      <section aria-labelledby="categories-section" className={styles.step}>
        <h2 id="categories-section">Categoría</h2>
        {categoriesLoading && (
          <p className={styles["loading-message"]}>Cargando categorías...</p>
        )}
        {categoriesError && (
          <p className={styles["error-message"]} role="alert">
            {categoriesError}
          </p>
        )}
        <RadioGroup
          name="category"
          label="Categoría de receta"
          options={categoryOptions}
          value={recipe.categoryId ? String(recipe.categoryId) : ""}
          onChange={handleCategoryChange}
          error={errors.category}
          required
          disabled={categoriesLoading}
        />

        <div className={styles["subcategory-container"]}>
          {subcategoriesLoading && recipe.categoryId && (
            <p className={styles["loading-message"]}>
              Cargando subcategorías...
            </p>
          )}
          {subcategoriesError && (
            <p className={styles["error-message"]} role="alert">
              {subcategoriesError}
            </p>
          )}
          {subcategoriesToShow.map((subId, index) => {
            const otherSelected = subcategoriesToShow
              .filter((_, j) => j !== index)
              .map((s) => String(s));
            const optionsForSelect = [
              { value: "", label: "Seleccionar subcategoría" },
              ...subcategoryOptions.filter(
                (opt) =>
                  opt.value === String(subId) ||
                  !otherSelected.includes(opt.value),
              ),
            ];
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
                  value={subId ? String(subId) : ""}
                  disabled={!recipe.categoryId}
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
          {subcategoryIds.length < MAX_SUBCATEGORIES && (
            <Button
              type="button"
              label="Agregar subcategoría"
              iconLeft="Plus"
              variant="secondary"
              disabled={!recipe.categoryId}
              onClick={handleAddSubcategory}
            />
          )}
        </div>
      </section>

      <Separator />

      <div className={styles["fieldset-categories"]}>
        <label
          className={styles["legend-categories"]}
          id="dietary-restrictions-label"
        >
          Dietas y restricciones
        </label>
        <p className={styles["step-helper"]}>
          Seleccioná las que correspondan a esta receta.
        </p>
        <div className={styles["chips-container"]}>
          {DIETARY_RESTRICTION_OPTIONS.map((option) => {
            const isSelected = dietaryRestrictions.includes(option.value);
            return (
              <Chip
                key={option.value}
                selected={isSelected}
                onClick={() => {
                  const newValues = isSelected
                    ? dietaryRestrictions.filter((v) => v !== option.value)
                    : [...dietaryRestrictions, option.value];
                  handleDietaryRestrictionsChange(newValues);
                }}
              >
                {option.label}
              </Chip>
            );
          })}
        </div>
        {errors.dietaryRestrictions && (
          <p className={styles["error-message"]} role="alert">
            {errors.dietaryRestrictions}
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
