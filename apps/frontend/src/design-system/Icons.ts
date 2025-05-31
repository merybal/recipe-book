// library: https://lucide.dev/
import {
  Carrot,
  Check,
  ChefHat,
  CircleX,
  ExternalLink,
  Leaf,
  Mail,
  Milk,
  Paperclip,
  Search,
  Vegan,
  Wheat,
} from "lucide-react";

export const iconMap = {
  carrot: Carrot,
  check: Check,
  chefHat: ChefHat,
  circleX: CircleX,
  externalLink: ExternalLink,
  leaf: Leaf,
  mail: Mail,
  milk: Milk,
  paperclip: Paperclip,
  search: Search,
  wheat: Wheat,
  vegan: Vegan,
};

export type IconName = keyof typeof iconMap;
