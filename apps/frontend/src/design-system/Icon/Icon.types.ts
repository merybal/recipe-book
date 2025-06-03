import { sizeMap } from "./Icon.constants";
import { iconMap } from "./Icons.constants";

export type IconSize = keyof typeof sizeMap;

export type IconName = keyof typeof iconMap;

export type IconProps = {
  background?: string;
  className?: string;
  color?: string;
  name: IconName;
  size?: IconSize;
};
