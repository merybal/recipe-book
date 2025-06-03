// library: https://lucide.dev/
// TODO ver como dar credito a lucide por los icons
import type { IconProps } from "./Icon.types";
import { sizeMap } from "./Icon.constants";

import { iconMap } from "./Icons.constants";
import clsx from "clsx";
import styles from "./Icon.module.scss";

//TODO hacer accesible
const Icon = ({
  background,
  className,
  color,
  name,
  size = "md",
}: IconProps) => {
  const LucideIcon = iconMap[name];
  const pixelSize = sizeMap[size];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in iconMap.`);
    return null;
  }

  return (
    <div
      className={clsx(
        styles.icon,
        { [styles[`bg-${background}`]]: background },
        { [styles[`size-${size}`]]: background },
        { [styles[`color-${color}`]]: color },
        className
      )}
    >
      <LucideIcon size={pixelSize} color="currentColor" />
    </div>
  );
};

export default Icon;
