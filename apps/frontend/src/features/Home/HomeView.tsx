import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import type { PreviewData } from "@/features/Home/TileGrid";
import type { DietaryRestrictionType } from "@/types";

import styles from "./HomeView.module.scss";
import TileGrid from "@/features/Home/TileGrid";
import MultipleEditableFields from "@/design-system/components/MultipleEditableFields";
import { EditableFieldType } from "@/design-system/components/MultipleEditableFields";
import { parseDietaryRestrictionsForFrontend } from "@/utils/dietary-restrictions-utils";
import Button from "@/design-system/components/Button";

const HomeView = () => {
  const navigate = useNavigate();
  const [recipePreviews, setRecipePreviews] = useState<PreviewData[]>([]);

  useEffect(() => {
    const fetchRecipePreviews = async () => {
      try {
        const response = await axios.get("/api/recipes");
        const mappedData: PreviewData[] = response.data.map(
          (r: {
            id: number;
            title: string;
            image_url: string | null;
            recipe_dietary_restrictions?: Array<{
              dietary_restriction: { name: string };
            }>;
          }) => ({
            id: r.id,
            title: r.title,
            imageUrl: r.image_url ?? undefined,
            dietaryRestrictions: r.recipe_dietary_restrictions
              ?.map((rdr) =>
                parseDietaryRestrictionsForFrontend(
                  rdr.dietary_restriction.name,
                ),
              )
              .filter(
                (dr): dr is DietaryRestrictionType => dr !== undefined,
              ),
          }),
        );
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
    // Update fields state with new values
    setFields((prevFields) =>
      prevFields.map((field) => ({
        ...field,
        value: updatedValues[field.key] ?? field.value,
      })),
    );
  };

  return (
    <div className={clsx(styles.home)}>
      <Button
        label="Agregar receta"
        onClick={() => navigate("/create-recipe")}
      />
      <TileGrid previewData={recipePreviews} />

      <MultipleEditableFields
        fields={fields}
        singleLabel="Datos de usuario"
        onChange={handleFieldsChange}
      />
    </div>
  );
};

export default HomeView;
