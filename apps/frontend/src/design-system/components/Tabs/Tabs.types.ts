import type { ReactNode } from "react";

export type TabProps = {
  /** Unique value that identifies the tab. */
  value: string;
  /** Visible label for the tab. */
  label: string;
  /** Content shown when this tab is active. */
  children?: ReactNode;
};

export type TabsProps = {
  /** Tab components; each defines value, label, and panel content as children. */
  children: ReactNode;
  /** Initial active tab value. Defaults to the first tab if not set. */
  defaultValue?: string;
  /** Called when the user selects a different tab (optional). */
  onChange?: (value: string) => void;
  /** Extra CSS class for the container. */
  className?: string;
  /** Id for the container (e.g. for aria-labelledby on the content panel). */
  id?: string;
};
