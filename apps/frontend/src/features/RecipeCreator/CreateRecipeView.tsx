import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Button from "@/design-system/components/Button";
import CoverStep from "@/features/RecipeCreator/steps/CoverStep";
import CategoriesStep from "@/features/RecipeCreator/steps/CategoriesStep";
import BasicInformationStep from "./steps/BasicInformationStep";
import SubrecipesStep from "./steps/SubrecipesStep";
import AdditionalInformationStep from "./steps/AdditionalInformationStep";
import PageLayout from "@/design-system/components/PageLayout/PageLayout";
import {
  validateStepCover,
  validateBakingInstructions,
  validateCategories,
} from "@/utils/form-validation-utils";
import { buildRecipePayload } from "@/utils/recipe-submit-utils";
import { formatIngredientsToText } from "@/utils/idml-file-uploader-utils";

import type {
  RecipeType,
  IngredientType,
  SubrecipeDraftType,
  UnitRaw,
} from "@/types";
import { useLocale } from "@/hooks/useLocale";

import styles from "./CreateRecipeView.module.scss";
import RecipePreview from "./RecipePreview";

const recipeExample = {
  title: "Dulce",
  subrecipes: [
    {
      title: "Subreceta",
      ingredients: [
        {
          name: "Harina 0000",
          amount: 116,
          unit: "g",
        },
        {
          name: "Manteca",
          amount: 100,
          unit: "g",
        },
        {
          name: "Azúcar impalpable",
          amount: 75,
          unit: "g",
        },
        {
          name: "Yema de huevo",
          amount: 2,
        },
        {
          name: "Sal fina",
          amount: 1,
        },
        {
          name: "Ralladura de limón",
          unit: "c/n",
        },
      ],
      instructions: [
        "Precalentar horno a 180ºC.",
        "Procesar la manteca, la harina y el azúcar juntos hasta obtener masa con aspecto de migas homogéneas. Si no tiene procesadora, dejar la manteca fuera hasta que tome consistencia blanda. Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar. Enfriar la masa en la heladera o freezer.",
        "Pelar y cortar la manzana en cubos de 1 a 1,5 cm. Enmantecar el molde y esparcir las manzanas sobre la base. Cubrir las manzanas esparciéndoles la masa sobre ellas.",
      ],
    },
    {
      title: "Subreceta 2",
      ingredients: [
        {
          name: "Limón",
          amount: 1.5,
        },
        {
          name: "Manteca",
          amount: 100,
          unit: "g",
        },
        {
          name: "Azúcar impalpable",
          amount: 1.5,
          unit: "cdas",
        },
        {
          name: "Yema de huevo",
          amount: 0.5,
        },
        {
          name: "Sal fina",
          amount: 1,
        },
        {
          name: "Ralladura de limón",
          unit: "c/n",
        },
      ],
      instructions: [
        "Precalentar horno a 110ºC.",
        "Procesar la manteca, la harina y el azúcar juntos hasta obtener masa con aspecto de migas homogéneas. Si no tiene procesadora, dejar la manteca fuera hasta que tome consistencia blanda. Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar. Enfriar la masa en la heladera o freezer.",
        "Pelar y cortar la manzana en cubos de 1 a 1,5 cm. Enmantecar el molde y esparcir las manzanas sobre la base. Cubrir las manzanas esparciéndoles la masa sobre ellas.",
      ],
    },
  ],
  dietaryRestrictions: ["dairyFree", "glutenFree", "vegan"],
  servings: "4 porciones",
  mold: {
    type: "Circular",
    size: "22-24 cm",
  },
  bakingInstructions: {
    time: "45 min",
    temperature: 180,
  },
  notes: [
    "Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar.",
    "Poner en bowl, trabajar muy rápido con la mano, incorporando la harina y el azúcar.",
  ],
  source: {
    name: ["Paulina Cocina", "Laura Bolomo"],
    url: [
      "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
    ],
  },
};

const PREVIEW_STEP_INDEX = 5;

const CreateRecipeView = () => {
  const navigate = useNavigate();
  const { id: recipeId } = useParams<{ id: string }>();
  const location = useLocation();
  const initialRecipe = (location.state as { recipe?: RecipeType })?.recipe;
  const locale = useLocale();

  const [units, setUnits] = useState<UnitRaw[]>([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** Step index when editing from preview (0-4), null when in normal flow. */
  const [editingFromPreview, setEditingFromPreview] = useState<number | null>(
    null,
  );

  const [recipe, setRecipe] = useState<RecipeType>({
    title: "",
    subrecipes: [],
  });

  const [subrecipeDrafts, setSubrecipeDrafts] = useState<SubrecipeDraftType[]>(
    [],
  );

  const [simpleRecipeDraft, setSimpleRecipeDraft] = useState<{
    ingredientsText: string;
    ingredients: IngredientType[];
    instructionsText: string;
    instructions: string[];
  }>({
    ingredientsText: "",
    ingredients: [],
    instructionsText: "",
    instructions: [],
  });

  const [isSelected, setIsSelected] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const skipNextSyncRef = useRef(false);
  const totalSteps = 6;

  /** Snapshot of state when entering edit-from-preview mode. Restored on cancel. */
  const editSnapshotRef = useRef<{
    recipe: RecipeType;
    subrecipeDrafts: SubrecipeDraftType[];
    simpleRecipeDraft: {
      ingredientsText: string;
      ingredients: IngredientType[];
      instructionsText: string;
      instructions: string[];
    };
    isSelected: boolean;
    files: File[];
  } | null>(null);

  useEffect(() => {
    axios
      .get<UnitRaw[]>(`/api/units?locale=${locale}`)
      .then((res) => setUnits(res.data))
      .catch(() => setUnits([]));
  }, [locale]);

  const isEditMode = !!recipeId && !!initialRecipe;
  const pageTitle = isEditMode
    ? currentStep === 5
      ? "Revisá los cambios"
      : "Editá la receta"
    : currentStep === 5
      ? "Revisá tu receta"
      : "Creá una nueva receta";

  // Initialize form when editing (recipe passed via location.state)
  useEffect(() => {
    if (!initialRecipe || units.length === 0) return;
    skipNextSyncRef.current = true; // Prevent sync effect from overwriting
    setCurrentStep(PREVIEW_STEP_INDEX); // Start at preview when editing from RecipeView
    setRecipe({
      id: initialRecipe.id,
      title: initialRecipe.title,
      imageUrl: initialRecipe.imageUrl,
      subrecipes: initialRecipe.subrecipes,
      bakingInstructions: initialRecipe.bakingInstructions,
      mold: initialRecipe.mold,
      introduction: initialRecipe.introduction,
      servings: initialRecipe.servings,
      notes: initialRecipe.notes,
      source: initialRecipe.source,
      dietaryRestrictions: initialRecipe.dietaryRestrictions,
      category: initialRecipe.category,
      categoryId: initialRecipe.categoryId,
      ...(initialRecipe.countryId != null && {
        countryId: initialRecipe.countryId,
        countryOfOrigin: initialRecipe.countryOfOrigin,
      }),
      subcategories: initialRecipe.subcategories,
      subcategoryIds: initialRecipe.subcategoryIds,
      tags: initialRecipe.tags,
    });
    const hasMultipleOrTitled =
      initialRecipe.subrecipes.length > 1 ||
      initialRecipe.subrecipes.some((s) => s.title?.trim());
    setIsSelected(!!hasMultipleOrTitled);
    if (hasMultipleOrTitled) {
      setSubrecipeDrafts(
        initialRecipe.subrecipes.map((s) => ({
          title: s.title ?? "",
          ingredientsText: formatIngredientsToText(
            s.ingredients ?? [],
            units,
          ),
          ingredients: s.ingredients ?? [],
          instructionsText: (s.instructions ?? []).join("\n"),
          instructions: s.instructions ?? [],
        })),
      );
    } else {
      const sub = initialRecipe.subrecipes[0];
      const ingredients = sub?.ingredients ?? [];
      const instructions = sub?.instructions ?? [];
      setSimpleRecipeDraft({
        ingredientsText: formatIngredientsToText(ingredients, units),
        ingredients,
        instructionsText: instructions.join("\n"),
        instructions,
      });
    }
  }, [initialRecipe, units]);

  // TODO remove
  useEffect(() => {
    console.log("Errores actuales:", errors);
  }, [errors]);

  useEffect(() => {
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }
    if (isSelected) {
      // When divided into subrecipes, build array from subrecipeDrafts
      const subrecipes = subrecipeDrafts.map((draft) => ({
        title: draft.title,
        ingredients: draft.ingredients,
        instructions: draft.instructions,
      }));
      setRecipe((prev) => ({ ...prev, subrecipes }));
    } else {
      // When simple (not divided), single subrecipe without title
      setRecipe((prev) => ({
        ...prev,
        subrecipes: [
          {
            title: "", // or null if preferred
            ingredients: simpleRecipeDraft.ingredients,
            instructions: simpleRecipeDraft.instructions,
          },
        ],
      }));
    }
  }, [subrecipeDrafts, simpleRecipeDraft, isSelected]);

  useEffect(() => {
    if (subrecipeDrafts) {
      console.log("subrecipeDrafts", subrecipeDrafts);
    }
  }, [subrecipeDrafts]);

  useEffect(() => {
    if (recipe) {
      console.log("La receta cambió:", recipe);
    }
  }, [recipe]);

  const nextStep = () => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 0) {
      const { title } = validateStepCover(recipe);
      if (title) stepErrors.title = title;
    }

    if (currentStep === 1) {
      const bakingErrors = validateBakingInstructions(recipe);
      Object.assign(stepErrors, bakingErrors);
    }

    if (currentStep === 3) {
      const categoryErrors = validateCategories(recipe);
      Object.assign(stepErrors, categoryErrors);
    }

    // You could add validations for other steps here too.

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return; // 🚫 no avanza al siguiente paso
    }

    // Clear empty values before advancing
    setRecipe((prev) => ({
      ...prev,
      subcategories: (prev.subcategories ?? [])
        .map((s) => s.trim())
        .filter(Boolean),
      notes: (prev.notes ?? []).map((n) => n.trim()).filter(Boolean),
    }));

    if (isSelected) {
      const filteredDrafts = subrecipeDrafts.filter(
        (d) =>
          (d.title ?? "").trim() !== "" ||
          (d.ingredientsText ?? "").trim() !== "" ||
          (d.instructionsText ?? "").trim() !== "",
      );
      setSubrecipeDrafts(filteredDrafts.length > 0 ? filteredDrafts : []);
    }

    setErrors({}); // ✅ limpia errores si todo OK
    if (currentStep < totalSteps - 1) setCurrentStep((prev) => prev + 1);
  };

  const saveEditSnapshot = () => {
    editSnapshotRef.current = {
      recipe: JSON.parse(JSON.stringify(recipe)),
      subrecipeDrafts: JSON.parse(JSON.stringify(subrecipeDrafts)),
      simpleRecipeDraft: JSON.parse(JSON.stringify(simpleRecipeDraft)),
      isSelected,
      files: [...files],
    };
  };

  const restoreEditSnapshot = () => {
    const snap = editSnapshotRef.current;
    if (!snap) return;
    setRecipe(snap.recipe);
    setSubrecipeDrafts(snap.subrecipeDrafts);
    setSimpleRecipeDraft(snap.simpleRecipeDraft);
    setIsSelected(snap.isSelected);
    setFiles(snap.files);
  };

  const prevStep = () => {
    if (editingFromPreview !== null) {
      restoreEditSnapshot();
      setErrors({});
      setEditingFromPreview(null);
      setCurrentStep(PREVIEW_STEP_INDEX);
      return;
    }
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const saveAndReturnToPreview = () => {
    const stepErrors: Record<string, string> = {};

    if (currentStep === 0) {
      const { title } = validateStepCover(recipe);
      if (title) stepErrors.title = title;
    }
    if (currentStep === 1) {
      Object.assign(stepErrors, validateBakingInstructions(recipe));
    }
    if (currentStep === 2) {
      if (errors.subrecipes) stepErrors.subrecipes = errors.subrecipes;
    }
    if (currentStep === 3) {
      Object.assign(stepErrors, validateCategories(recipe));
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setRecipe((prev) => ({
      ...prev,
      subcategories: (prev.subcategories ?? []).map((s) => s.trim()).filter(Boolean),
      notes: (prev.notes ?? []).map((n) => n.trim()).filter(Boolean),
    }));
    if (currentStep === 2 && isSelected) {
      const filteredDrafts = subrecipeDrafts.filter(
        (d) =>
          (d.title ?? "").trim() !== "" ||
          (d.ingredientsText ?? "").trim() !== "" ||
          (d.instructionsText ?? "").trim() !== "",
      );
      setSubrecipeDrafts(filteredDrafts.length > 0 ? filteredDrafts : []);
    }
    setEditingFromPreview(null);
    setCurrentStep(PREVIEW_STEP_INDEX);
  };

  const hasStepErrors = (): boolean => {
    if (currentStep === 0) {
      return !!errors.title;
    }

    if (currentStep === 1) {
      return !!errors.temperature || !!errors.time;
    }

    if (currentStep === 2) {
      return !!errors.subrecipes;
    }

    if (currentStep === 3) {
      return !!errors.category || !!errors.subcategories;
    }

    return false;
  };

  const handleSubmit = async () => {
    const categoryErrors = validateCategories(recipe);
    if (Object.keys(categoryErrors).length > 0) {
      setErrors(categoryErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      let imageUrl = recipe.imageUrl;
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0]);
        const { data } = await axios.post<{ url: string }>(
          "/api/upload/recipe-cover",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        imageUrl = data.url;
      }
      const recipeWithImage = { ...recipe, ...(imageUrl && { imageUrl }) };
      const payload = await buildRecipePayload(recipeWithImage);
      if (isEditMode && recipeId) {
        await axios.put(`/api/recipes/${recipeId}/full`, payload);
        navigate(`/recipes/${recipeId}`);
      } else {
        const { data } = await axios.post("/api/recipes/full", payload);
        navigate(`/recipes/${data.id}`);
      }
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? String(err.response.data.message)
          : "Error al guardar la receta. Intentá de nuevo.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout className={styles["create-recipe-page"]} title={pageTitle}>
      <form
        className={styles["recipe-form"]}
        onSubmit={(e) => e.preventDefault()}
      >
        <header className={styles["form-header"]}>
          <Button
            disruptive
            inline
            label="Cancelar"
            variant="text"
            onClick={() =>
              isEditMode && recipeId
                ? navigate(`/recipes/${recipeId}`)
                : navigate("/")
            }
          />
          <p className={styles["step-indicator"]}>
            {currentStep + 1} / {totalSteps}
          </p>
        </header>
        {currentStep === 0 && (
          <CoverStep
            errors={errors}
            files={files}
            recipe={recipe}
            setErrors={setErrors}
            setFiles={setFiles}
            setRecipe={setRecipe}
          />
        )}

        {currentStep === 1 && (
          <BasicInformationStep
            errors={errors}
            recipe={recipe}
            setErrors={setErrors}
            setRecipe={setRecipe}
          />
        )}

        {currentStep === 2 && (
          <SubrecipesStep
            errors={errors}
            recipe={recipe}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            setRecipe={setRecipe}
            setErrors={setErrors}
            setSimpleRecipeDraft={setSimpleRecipeDraft}
            setSubrecipeDrafts={setSubrecipeDrafts}
            simpleRecipeDraft={simpleRecipeDraft}
            subrecipeDrafts={subrecipeDrafts}
            units={units}
          />
        )}

        {currentStep === 3 && (
          <CategoriesStep
            errors={errors}
            recipe={recipe}
            setErrors={setErrors}
            setRecipe={setRecipe}
          />
        )}

        {currentStep === 4 && (
          <AdditionalInformationStep
            errors={errors}
            recipe={recipe}
            setErrors={setErrors}
            setRecipe={setRecipe}
          />
        )}

        {currentStep === 5 && (
          <RecipePreview
            recipeData={recipe}
            onChange={setRecipe}
            coverImageFiles={files}
            onCoverImageChange={setFiles}
            onEditCover={() => {
              saveEditSnapshot();
              setEditingFromPreview(0);
              setCurrentStep(0);
            }}
            onEditMold={() => {
              saveEditSnapshot();
              setEditingFromPreview(1);
              setCurrentStep(1);
            }}
            onEditBakingInstructions={() => {
              saveEditSnapshot();
              setEditingFromPreview(1);
              setCurrentStep(1);
            }}
            onEditSubrecipes={() => {
              saveEditSnapshot();
              setEditingFromPreview(2);
              setCurrentStep(2);
            }}
            onEditCategories={() => {
              saveEditSnapshot();
              setEditingFromPreview(3);
              setCurrentStep(3);
            }}
            onEditAdditionalInfo={() => {
              saveEditSnapshot();
              setEditingFromPreview(4);
              setCurrentStep(4);
            }}
          />
        )}

        <div className={styles["form-navigation"]}>
          {(currentStep > 0 || editingFromPreview !== null) && (
            <Button
              type="button"
              label={editingFromPreview !== null ? "Cancelar" : "Anterior"}
              variant="secondary"
              onClick={prevStep}
              disabled={hasStepErrors()}
            />
          )}
          {editingFromPreview !== null ? (
            <Button
              type="button"
              label="Guardar"
              onClick={saveAndReturnToPreview}
              disabled={hasStepErrors()}
            />
          ) : currentStep < totalSteps - 1 ? (
            <Button
              type="button"
              label="Siguiente"
              onClick={nextStep}
              disabled={hasStepErrors()}
            />
          ) : (
            <div className={styles["submit-container"]}>
              {submitError && (
                <p className={styles["submit-error"]} role="alert">
                  {submitError}
                </p>
              )}
              <Button
                type="submit"
                label="Guardar receta"
                disabled={isSubmitting}
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      </form>
    </PageLayout>
  );
};

export default CreateRecipeView;
