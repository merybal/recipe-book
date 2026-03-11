import { useEffect, useState } from "react";
import axios from "axios";

import { useLocale } from "./useLocale";
import { parseDietaryRestrictionsForFrontend } from "@/utils/dietary-restrictions-utils";

import type { DietaryRestrictionType } from "@/types";

type ApiItem = {
  id: number;
  name: string;
  name_en?: string;
  name_es?: string;
};

export function useDietaryRestrictionLabels(): Record<
  DietaryRestrictionType,
  string
> | null {
  const locale = useLocale();
  const [labels, setLabels] = useState<Record<
    DietaryRestrictionType,
    string
  > | null>(null);

  useEffect(() => {
    axios
      .get<ApiItem[]>("/api/dietary-restrictions")
      .then((res) => {
        const items = Array.isArray(res.data) ? res.data : [];
        const result = items.reduce(
          (acc, dr) => {
            const type = parseDietaryRestrictionsForFrontend(dr.name);
            if (type) {
              acc[type] =
                locale === "en"
                  ? dr.name_en ?? dr.name
                  : dr.name_es ?? dr.name;
            }
            return acc;
          },
          {} as Record<DietaryRestrictionType, string>,
        );
        setLabels(result);
      })
      .catch(() => setLabels(null));
  }, [locale]);

  return labels;
}
