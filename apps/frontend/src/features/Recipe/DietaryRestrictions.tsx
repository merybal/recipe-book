import Icon from "@/design-system/components/Icon";

import type { IconName } from "@/design-system/components/Icon";
import type { DietaryRestrictionType } from "@/types";

import clsx from "clsx";
import styles from "./DietaryRestrictions.module.scss";

import { useDietaryRestrictionLabels } from "@/hooks/useDietaryRestrictionLabels";

export type DietaryRestrictionsProps = {
  restrictions?: DietaryRestrictionType[];
  /** Labels from API (name_es/name_en) - when provided, uses these; otherwise fetches from API */
  labels?: Record<DietaryRestrictionType, string>;
  className?: string;
};

const DIETARY_RESTRICTION_CONFIG: Record<
  DietaryRestrictionType,
  { iconName: IconName; color: string }
> = {
  glutenFree: { iconName: "Wheat", color: "ochre" },
  dairyFree: { iconName: "Milk", color: "dark-gray" },
  vegan: { iconName: "Leaf", color: "green" },
  vegetarian: { iconName: "Carrot", color: "orange" },
};

const DietaryRestrictions = ({
  restrictions,
  labels: labelsProp,
  className,
}: DietaryRestrictionsProps) => {
  const labelsFromApi = useDietaryRestrictionLabels();
  const labels = labelsProp ?? labelsFromApi;

  const filtered =
    restrictions?.includes("vegan")
      ? restrictions.filter((r) => r !== "vegetarian")
      : restrictions;

  const toShow = filtered?.filter(
    (restriction) => labels?.[restriction],
  ) ?? [];

  if (toShow.length === 0) return null;

  return (
    <div className={clsx(styles["dietary-restrictions-container"], className)}>
      {toShow.map((restriction) => {
        const config = DIETARY_RESTRICTION_CONFIG[restriction];
        const label = labels![restriction];
        return (
          <div
            className={styles["restriction-container"]}
            key={restriction}
          >
            <Icon name={config.iconName} size="sm" color={config.color} />
            <p>{label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DietaryRestrictions;
