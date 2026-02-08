import clsx from "clsx";

import type { TabsProps } from "./Tabs.types";

import styles from "./Tabs.module.scss";

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className,
  id,
}: TabsProps) => {
  const baseId = id ?? "tabs";
  const activeTabItem = tabs.find((t) => t.value === activeTab);
  const hasPanel = activeTabItem?.children != null;

  return (
    <div id={id} className={clsx(styles.wrapper, className)}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Tabs"
      >
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
            onClick={() => onChange(tab.value)}
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
