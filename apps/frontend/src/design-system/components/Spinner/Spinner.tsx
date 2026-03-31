import clsx from "clsx";

import Icon from "@/design-system/components/Icon";
import type { IconSize } from "@/design-system/components/Icon/Icon.types";

import styles from "./Spinner.module.scss";

export type SpinnerProps = {
  className?: string;
  /** Theme color key for the icon stroke. */
  color?: string;
  size?: IconSize;
};

const Spinner = ({
  className,
  color = "primary",
  size = "xl",
}: SpinnerProps) => {
  return (
    <div
      className={clsx(styles.root, className)}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Icon
        className={styles.spin}
        color={color}
        name="LoaderCircle"
        size={size}
      />
    </div>
  );
};

export default Spinner;
