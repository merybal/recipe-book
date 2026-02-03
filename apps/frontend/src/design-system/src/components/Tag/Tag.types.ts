import { ReactNode } from "react";

export type TagProps = {
  /** Extra CSS class applied to the tag. */
  className?: string;
  /** Content inside the tag (e.g. text or icon). */
  children: ReactNode;
  /** Layout direction of the tag content. */
  variant?: "horizontal" | "vertical";
};
