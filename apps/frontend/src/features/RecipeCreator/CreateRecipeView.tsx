import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@/design-system/components/Button";
import CoverStep from "@/features/RecipeCreator/steps/CoverStep";
import CategoriesStep from "@/features/RecipeCreator/steps/CategoriesStep";
import BasicInformationStep from "./steps/BasicInformationStep";
import SubrecipesStep from "./steps/SubrecipesStep";
import AdditionalInformationStep from "./steps/AdditionalInformationStep";
import PageLayout from "@/design-system/components/PageLayout/PageLayout";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  validateStepCover,
  validateBakingInstructions,
  validateCategories,
} from "@/utils/form-validation-utils";
import { buildRecipePayload } from "@/utils/recipe-submit-utils";

import type { RecipeType, IngredientType, SubrecipeDraftType } from "@/types";

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
    time: 10,
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
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** True cuando el usuario fue al step 0 desde "Editar portada" en la preview. */
  const [editingCoverFromPreview, setEditingCoverFromPreview] = useState(false);

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
  const totalSteps = 6;

  const isMobile = useIsMobile();

  const pageTitle =
    currentStep === 5 ? "Revisá tu receta" : "Creá una nueva receta";

  // TODO remove
  useEffect(() => {
    console.log("Errores actuales:", errors);
  }, [errors]);

  useEffect(() => {
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

  const prevStep = () => {
    if (currentStep === 0 && editingCoverFromPreview) {
      setEditingCoverFromPreview(false);
      setCurrentStep(PREVIEW_STEP_INDEX);
      return;
    }
    if (currentStep > 0) setCurrentStep(currentStep - 1);
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
      const payload = await buildRecipePayload(recipe);
      const { data } = await axios.post("/api/recipes/full", payload);
      navigate(`/recipes/${data.id}`);
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

  /** Valida la portada y, si es válida, vuelve al step de preview. Usado desde "Editar portada". */
  const saveCoverAndReturnToPreview = () => {
    const { title } = validateStepCover(recipe);
    if (title) {
      setErrors((prev) => ({ ...prev, title }));
      return;
    }
    setErrors((prev) => {
      const next = { ...prev };
      delete next.title;
      return next;
    });
    setEditingCoverFromPreview(false);
    setCurrentStep(PREVIEW_STEP_INDEX);
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
            onClick={() => console.log("cancelar")}
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
              setEditingCoverFromPreview(true);
              setCurrentStep(0);
            }}
            onEditMold={() => setCurrentStep(1)}
            onEditBakingInstructions={() => setCurrentStep(2)}
            onEditSubrecipes={() => setCurrentStep(2)}
            onEditCategories={() => setCurrentStep(3)}
            onEditAdditionalInfo={() => setCurrentStep(4)}
          />
        )}

        <div className={styles["form-navigation"]}>
          {(currentStep > 0 || editingCoverFromPreview) && (
            <Button
              type="button"
              label={editingCoverFromPreview ? "Cancelar edición" : "Anterior"}
              variant="secondary"
              onClick={prevStep}
              disabled={hasStepErrors()}
            />
          )}
          {currentStep === 0 && editingCoverFromPreview ? (
            <Button
              type="button"
              label="Guardar cambios"
              onClick={saveCoverAndReturnToPreview}
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
