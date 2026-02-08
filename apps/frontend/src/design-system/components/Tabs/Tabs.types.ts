import type { ReactNode } from "react";

export type TabItem = {
  /** Unique value that identifies the tab. */
  value: string;
  /** Visible label for the tab. */
  label: string;
  /** Content shown when this tab is active. */
  children?: ReactNode;
};

export type TabsProps = {
  /** List of tabs (value, label). */
  tabs: TabItem[];
  /** Value of the currently active tab. */
  activeTab: string;
  /** Called when the user selects a different tab. */
  onChange: (value: string) => void;
  /** Extra CSS class for the container. */
  className?: string;
  /** Id for the container (e.g. for aria-labelledby on the content panel). */
  id?: string;
};
