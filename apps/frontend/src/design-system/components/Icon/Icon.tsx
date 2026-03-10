// library: https://lucide.dev/
// TODO figure out how to credit lucide for the icons
import type { IconProps } from "./Icon.types";
import { sizeMap } from "./Icon.constants";

import { iconMap } from "./Icons.constants";
import clsx from "clsx";
import styles from "./Icon.module.scss";

// TODO make accessible
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

  const resolvedColor = color ? `var(--color-${color})` : undefined;
  const resolvedBackground = background
    ? `var(--color-${background})`
    : undefined;

  return (
    <div
      className={clsx(
        styles.icon,
        { [styles[`size-${size}`]]: background },
        className
      )}
      style={{
        backgroundColor: resolvedBackground,
        borderRadius: "var(--border-radius-full)",
      }}
    >
      <LucideIcon size={pixelSize} color={resolvedColor ?? "currentColor"} />
    </div>
  );
};

export default Icon;
