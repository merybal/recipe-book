import { sizeMap } from "./Icon.constants";
import { iconMap } from "./Icons.constants";

export type IconSize = keyof typeof sizeMap;

export type IconName = keyof typeof iconMap;

export type IconProps = {
  /** Theme color key for background (e.g. "primary"). */
  background?: string;
  /** Extra CSS class applied to the icon wrapper. */
  className?: string;
  /** Theme color key for the icon (e.g. "primary"). */
  color?: string;
  /** Icon name (must exist in iconMap). */
  name: IconName;
  /** Visual size of the icon. */
  size?: IconSize;
};
