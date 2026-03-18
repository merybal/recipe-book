import type { IconName } from "../Icon";

export type BottomNavItem = {
  id: string;
  label: string;
  icon: IconName;
  onClick: () => void;
};

export type BottomNavProps = {
  /** Navigation items. The item at the center index will render as the floating circular button. */
  items: BottomNavItem[];
  /** ID of the currently active item (for styling). */
  activeItemId?: string;
  /** Index of the item that renders as the central floating button (default: middle item). */
  centerItemIndex?: number;
  className?: string;
};
