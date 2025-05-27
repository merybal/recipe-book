// library: https://lucide.dev/
import { iconMap, IconName } from "./Icons";
import clsx from "clsx";
import styles from "./Icon.module.scss";

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

type IconSize = keyof typeof sizeMap;

type IconProps = {
  background?: string;
  className?: string;
  color?: string;
  name: IconName;
  size?: IconSize;
};

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
