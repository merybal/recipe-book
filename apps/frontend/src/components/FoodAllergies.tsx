import Icon from "@/design-system/Icon";

import type { IconName } from "@/design-system/Icon";
import type { FoodAllergyType } from "@/types";

import clsx from "clsx";
import styles from "./FoodAllergies.module.scss";

export type FoodAllergiesProps = {
  allergies?: FoodAllergyType[];
  background?: string;
  className?: string;
};

const allergyToIconName: Record<FoodAllergyType, IconName> = {
  glutenFree: "wheat",
  dairyFree: "milk",
  vegan: "leaf",
  vegetarian: "carrot",
};

const FoodAllergies = ({ allergies, className }: FoodAllergiesProps) => {
  const filteredAllergies = allergies?.includes("vegan")
    ? allergies.filter((a) => a !== "vegetarian")
    : allergies;

  return (
    <div className={clsx(styles.foodAllergiesContainer, className)}>
      {filteredAllergies?.map((allergy) => (
        <Icon
          key={allergy}
          className={styles.allergyIcon}
          name={allergyToIconName[allergy]}
          size="sm"
        />
      ))}
    </div>
  );
};

export default FoodAllergies;
