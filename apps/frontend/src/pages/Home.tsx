import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import type { PreviewData } from "@/components/TileGrid";
import type { FoodAllergyType } from "@/types";

import styles from "./Home.module.scss";
import TileGrid from "@/components/TileGrid";
import MultipleEditableFields from "@/design-system/src/components/MultipleEditableFields";
import { EditableFieldType } from "@/design-system/src/components/MultipleEditableFields";
import { parseFoodAllergiesforFrontend } from "@/utils/food-allergies-utils";

const Home = () => {
  const [recipePreviews, setRecipePreviews] = useState<PreviewData[]>([]);

  useEffect(() => {
    const fetchRecipePreviews = async () => {
      try {
        const response = await axios.get("/api/recipes");
        const mappedData: PreviewData[] = response.data.map((r: {
          id: number;
          title: string;
          image_url: string | null;
          recipe_food_allergies?: Array<{ food_allergy: { name: string } }>;
        }) => ({
          id: r.id,
          title: r.title,
          imageUrl: r.image_url ?? undefined,
          foodAllergies: r.recipe_food_allergies
            ?.map((rfa) => parseFoodAllergiesforFrontend(rfa.food_allergy.name))
            .filter((a): a is FoodAllergyType => a !== undefined),
        }));
        setRecipePreviews(mappedData);
      } catch (error) {
        console.error("Error fetching recipe previews", error);
      }
    };

    fetchRecipePreviews();
  }, []);

  const [fields, setFields] = useState<EditableFieldType[]>([
    {
      key: "name",
      label: "Nombre",
      value: "Juan Pérez",
      required: true,
      component: "input",
      placeholder: "Ingresa tu nombre",
    },
    {
      key: "age",
      label: "Edad",
      value: "30",
      component: "input",
      type: "number",
      validate: (val: string) => {
        if (!val) return "La edad es obligatoria";
        if (isNaN(Number(val))) return "Debe ser un número";
        if (Number(val) < 0) return "No puede ser negativa";
        return undefined;
      },
    },
    {
      key: "gender",
      label: "Género",
      value: "male",
      component: "select",
      options: [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Femenino" },
        { value: "other", label: "Otro" },
      ],
    },
  ]);

  const handleFieldsChange = (updatedValues: Record<string, string>) => {
    // Actualizamos el estado fields con los nuevos valores
    setFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        value: updatedValues[field.key] ?? field.value,
      }))
    );
  };

  return (
    <div className={clsx(styles.home)}>
      <TileGrid previewData={recipePreviews} />

      <MultipleEditableFields
        fields={fields}
        singleLabel="Datos de usuario"
        onChange={handleFieldsChange}
      />
    </div>
  );
};

export default Home;
