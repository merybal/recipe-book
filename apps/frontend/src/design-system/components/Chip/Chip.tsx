import type { ChipProps } from "./Chip.types";
import ButtonUnstyled from "../ButtonUnstyled";
import Icon from "../Icon";
import Box from "../Box";

import clsx from "clsx";
import styles from "./Chip.module.scss";

const Chip = ({
  className,
  children,
  onClick,
  onRemove,
  selected = false,
}: ChipProps) => {
  const isRemovable = Boolean(onRemove);
  const isClickable = Boolean(onClick) && !isRemovable;

  const rootClassName = clsx(
    styles.chip,
    isRemovable && styles.removable,
    isClickable && styles.clickable,
    selected && styles.selected,
    className,
  );

  const content = (
    <>
      <span className={styles.content}>{children}</span>
      {isRemovable && onRemove && (
        <ButtonUnstyled
          type="button"
          aria-label="Quitar"
          onClick={onRemove}
          className={styles["remove-button"]}
        >
          <Icon name="X" size="xs" />
        </ButtonUnstyled>
      )}
    </>
  );

  if (isClickable) {
    const handleClick = onClick!;
    return (
      <button
        type="button"
        className={rootClassName}
        onClick={() => handleClick()}
      >
        {content}
      </button>
    );
  }

  return <Box className={rootClassName} flex>{content}</Box>;
};

export default Chip;
