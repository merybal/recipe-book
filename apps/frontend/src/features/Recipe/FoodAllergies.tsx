import Icon from "@/design-system/components/Icon";

import type { IconName } from "@/design-system/components/Icon";
import type { FoodAllergyType } from "@/types";

import clsx from "clsx";
import styles from "./FoodAllergies.module.scss";

export type FoodAllergiesProps = {
  allergies?: FoodAllergyType[];
  background?: string;
  className?: string;
};

const FOOD_ALLERGY_CONFIG: Record<
  FoodAllergyType,
  { iconName: IconName; label: string; color: string }
> = {
  glutenFree: { iconName: "Wheat", label: "Sin gluten", color: "ochre" },
  dairyFree: { iconName: "Milk", label: "Sin lactosa", color: "dark-gray" },
  vegan: { iconName: "Leaf", label: "Vegano", color: "green" },
  vegetarian: { iconName: "Carrot", label: "Vegetariano", color: "orange" },
};

const FoodAllergies = ({ allergies, className }: FoodAllergiesProps) => {
  const filteredAllergies = allergies?.includes("vegan")
    ? allergies.filter((a) => a !== "vegetarian")
    : allergies;

  return (
    <div className={clsx(styles["food-allergies-container"], className)}>
      {filteredAllergies?.map((allergy) => {
        const config = FOOD_ALLERGY_CONFIG[allergy];
        return (
          <div className={styles["allergy-container"]} key={allergy}>
            <Icon name={config.iconName} size="sm" color={config.color} />
            <p>{config.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FoodAllergies;
