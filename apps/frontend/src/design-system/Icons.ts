// library: https://lucide.dev/
import {
  Carrot,
  Check,
  ChefHat,
  ExternalLink,
  Leaf,
  Milk,
  Vegan,
  Wheat,
} from "lucide-react";

export const iconMap = {
  carrot: Carrot,
  check: Check,
  chefHat: ChefHat,
  externalLink: ExternalLink,
  leaf: Leaf,
  milk: Milk,
  wheat: Wheat,
  vegan: Vegan,
};

export type IconName = keyof typeof iconMap;
