import { useState, useEffect } from "react";

import Button from "@/design-system/src/components/Button";
import CoverStep from "@/components/RecipeCreator/CoverStep";
import MoldAndBakingInstructionsStep from "./MoldAndBakingInstructionsStep";
import SubrecipesStep from "./SubrecipesStep";

import { useIsMobile } from "@/hooks/useIsMobile";

import type { RecipeType, IngredientType, SubrecipeDraftType } from "@/types";

import styles from "./RecipeForm.module.scss";

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
  foodAllergies: ["dairyFree", "glutenFree", "vegan"],
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

const RecipeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [recipe, setRecipe] = useState<RecipeType>({
    title: "",
    subrecipes: [],
  });

  const [subrecipeDrafts, setSubrecipeDrafts] = useState<SubrecipeDraftType[]>(
    []
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

  const [isChecked, setIsChecked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const totalSteps = 4;

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isChecked) {
      // Cuando está dividido en subrecetas, armo el array desde subrecipeDrafts
      const subrecipes = subrecipeDrafts.map((draft) => ({
        title: draft.title,
        ingredients: draft.ingredients,
        instructions: draft.instructions,
      }));
      setRecipe((prev) => ({ ...prev, subrecipes }));
    } else {
      // Cuando es simple (no dividido), solo una subreceta sin título
      setRecipe((prev) => ({
        ...prev,
        subrecipes: [
          {
            title: "", // o null si preferís
            ingredients: simpleRecipeDraft.ingredients,
            instructions: simpleRecipeDraft.instructions,
          },
        ],
      }));
    }
  }, [subrecipeDrafts, simpleRecipeDraft, isChecked]);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

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

  //TODO falta autor
  //TODO falta food allergies

  //TODO meter en un form
  //TODO hcaer ids dinamicos

  return (
    <form className={styles["recipe-form"]}>
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
          recipe={recipe}
          setRecipe={setRecipe}
          files={files}
          setFiles={setFiles}
        />
      )}

      {currentStep === 1 && (
        <MoldAndBakingInstructionsStep recipe={recipe} setRecipe={setRecipe} />
      )}

      {currentStep === 2 && (
        <SubrecipesStep
          recipe={recipe}
          setRecipe={setRecipe}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          subrecipeDrafts={subrecipeDrafts}
          setSubrecipeDrafts={setSubrecipeDrafts}
          simpleRecipeDraft={simpleRecipeDraft}
          setSimpleRecipeDraft={setSimpleRecipeDraft}
        />
      )}

      <div className={styles["form-navigation"]}>
        {currentStep > 0 && (
          <Button label="Anterior" variant="secondary" onClick={prevStep} />
        )}
        {currentStep < totalSteps - 1 ? (
          <Button label="Siguiente" onClick={nextStep} />
        ) : (
          <Button
            type="submit"
            label="Guardar receta"
            onClick={() => console.log("submiiiiit")}
          />
        )}
      </div>
    </form>
  );
};

export default RecipeForm;
