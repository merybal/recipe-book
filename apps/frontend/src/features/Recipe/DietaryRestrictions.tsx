import Icon from "@/design-system/components/Icon";
import Box from "@/design-system/components/Box";

import type { IconName } from "@/design-system/components/Icon";
import type { DietaryRestrictionType } from "@/types";

import { useDietaryRestrictionLabels } from "@/hooks/useDietaryRestrictionLabels";

export type DietaryRestrictionsProps = {
  restrictions?: DietaryRestrictionType[];
  /** Labels from API (name_es/name_en) - when provided, uses these; otherwise fetches from API */
  labels?: Record<DietaryRestrictionType, string>;
  /** When true, only show icons (no text) */
  iconsOnly?: boolean;
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
  iconsOnly = false,
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
    <Box className={className} align="start" gap="xs">
      {toShow.map((restriction) => {
        const config = DIETARY_RESTRICTION_CONFIG[restriction];
        const label = labels![restriction];
        return (
          <Box
            key={restriction}
            align="center"
            gap="xs"
            title={iconsOnly ? label : undefined}
          >
            <Icon name={config.iconName} size="sm" color={config.color} />
            {!iconsOnly && <p>{label}</p>}
          </Box>
        );
      })}
    </Box>
  );
};

export default DietaryRestrictions;
