import Icon from "@/design-system/components/Icon";

import type { IconName } from "@/design-system/components/Icon";
import type { DietaryRestrictionType } from "@/types";

import clsx from "clsx";
import styles from "./DietaryRestrictions.module.scss";

export type DietaryRestrictionsProps = {
  restrictions?: DietaryRestrictionType[];
  className?: string;
};

const DIETARY_RESTRICTION_CONFIG: Record<
  DietaryRestrictionType,
  { iconName: IconName; label: string; color: string }
> = {
  glutenFree: { iconName: "Wheat", label: "Sin gluten", color: "ochre" },
  dairyFree: { iconName: "Milk", label: "Sin lactosa", color: "dark-gray" },
  vegan: { iconName: "Leaf", label: "Vegano", color: "green" },
  vegetarian: { iconName: "Carrot", label: "Vegetariano", color: "orange" },
};

const DietaryRestrictions = ({
  restrictions,
  className,
}: DietaryRestrictionsProps) => {
  const filtered =
    restrictions?.includes("vegan")
      ? restrictions.filter((r) => r !== "vegetarian")
      : restrictions;

  return (
    <div className={clsx(styles["dietary-restrictions-container"], className)}>
      {filtered?.map((restriction) => {
        const config = DIETARY_RESTRICTION_CONFIG[restriction];
        return (
          <div
            className={styles["restriction-container"]}
            key={restriction}
          >
            <Icon name={config.iconName} size="sm" color={config.color} />
            <p>{config.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DietaryRestrictions;
