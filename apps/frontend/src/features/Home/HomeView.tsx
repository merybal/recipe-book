import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";
import type { PreviewData } from "@/features/Home/TileGrid";
import type { DietaryRestrictionType } from "@/types";

import styles from "./HomeView.module.scss";
import TileGrid from "@/features/Home/TileGrid";
import BottomNav from "@/design-system/components/BottomNav";
import Box from "@/design-system/components/Box";
import { EditableFieldType } from "@/design-system/components/MultipleEditableFields";
import { parseDietaryRestrictionsForFrontend } from "@/utils/dietary-restrictions-utils";

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
            recipe_sources?: Array<{
              name: string | null;
              url: string | null;
              sort_order: number;
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
              .filter((dr): dr is DietaryRestrictionType => dr !== undefined),
            ...(r.recipe_sources?.length
              ? {
                  source: {
                    name: r.recipe_sources
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((s) => s.name ?? "")
                      .filter(Boolean) as string[],
                    url: r.recipe_sources
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((s) => s.url ?? null) as (string | null)[],
                  },
                }
              : {}),
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

  const bottomNavItems = [
    {
      id: "home",
      label: "Home",
      icon: "Home" as const,
      onClick: () => navigate("/"),
    },
    {
      id: "add",
      label: "Agregar receta",
      icon: "Plus" as const,
      onClick: () => navigate("/create-recipe"),
    },
  ];

  return (
    <Box
      className={clsx(styles.home)}
      padding="lg"
      flex
      direction="column"
      gap="lg"
      paddingBottom="8rem"
    >
      <TileGrid previewData={recipePreviews} />
      <BottomNav
        items={bottomNavItems}
        activeItemId="home"
        centerItemIndex={1}
      />
    </Box>
  );
};

export default HomeView;
