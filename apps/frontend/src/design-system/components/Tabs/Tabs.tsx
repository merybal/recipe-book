import {
  Children,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import clsx from "clsx";

import type { TabProps, TabsProps } from "./Tabs.types";

import styles from "./Tabs.module.scss";

/** Renders nothing; Tabs reads value, label and children from Tab elements. */
export const Tab = (_props: TabProps): null => null;

const TAB_TYPE = Tab;

function getTabsFromChildren(children: ReactNode): Array<TabProps & { children?: ReactNode }> {
  return Children.toArray(children)
    .filter(
      (child): child is ReactElement<TabProps> =>
        isValidElement(child) && child.type === TAB_TYPE
    )
    .map((child) => ({
      value: child.props.value,
      label: child.props.label,
      children: child.props.children,
    }));
}

const Tabs = ({
  children,
  defaultValue,
  onChange,
  className,
  id,
}: TabsProps) => {
  const tabs = getTabsFromChildren(children);
  const [activeTab, setActiveTab] = useState(
    () => defaultValue ?? tabs[0]?.value ?? ""
  );
  const baseId = id ?? "tabs";
  const activeTabItem = tabs.find((t) => t.value === activeTab);
  const hasPanel = activeTabItem?.children != null;

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <div id={id} className={clsx(styles.wrapper, className)}>
      <div className={styles.tabs} role="tablist" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            id={`${baseId}-${tab.value}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={
              tab.children != null ? `${baseId}-panel-${tab.value}` : undefined
            }
            className={clsx(styles.tab, {
              [styles.active]: activeTab === tab.value,
              [styles.inactive]: activeTab !== tab.value,
            })}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {hasPanel && (
        <div
          id={`${baseId}-panel-${activeTab}`}
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`${baseId}-${activeTab}`}
        >
          {activeTabItem.children}
        </div>
      )}
    </div>
  );
};

export default Tabs;
