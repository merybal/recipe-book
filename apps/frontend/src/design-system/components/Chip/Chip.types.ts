import { ReactNode } from "react";

export type ChipProps = {
  /**
   * Extra CSS class applied to the chip.
   */
  className?: string;
  /**
   * Content inside the chip (e.g. text or icon).
   */
  children: ReactNode;
  /**
   * When provided, the whole chip is clickable. Not compatible with onRemove.
   */
  onClick?: () => void;
  /**
   * When provided, shows a remove (X) button that calls this on click. Not compatible with onClick.
   */
  onRemove?: () => void;
};
