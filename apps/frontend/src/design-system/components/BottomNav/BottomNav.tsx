import ButtonUnstyled from "../ButtonUnstyled";
import Icon from "../Icon";

import type { BottomNavProps } from "./BottomNav.types";

import clsx from "clsx";
import styles from "./BottomNav.module.scss";

const BottomNav = ({
  items,
  activeItemId,
  centerItemIndex,
  className,
}: BottomNavProps) => {
  const centerIndex =
    centerItemIndex ??
    Math.floor(items.length / 2);

  return (
    <nav className={clsx(styles.nav, className)} role="navigation">
      {items.map((item, index) => {
        const isCenter = index === centerIndex;

        if (isCenter) {
          return (
            <div key={item.id} className={styles["center-slot"]}>
              <ButtonUnstyled
                className={styles["center-button"]}
                onClick={item.onClick}
                type="button"
              >
                <Icon name={item.icon} color="white" size="lg" />
              </ButtonUnstyled>
              <span className={styles["center-label"]}>{item.label}</span>
            </div>
          );
        }

        return (
          <ButtonUnstyled
            key={item.id}
            className={clsx(
              styles.item,
              activeItemId === item.id && styles.active
            )}
            onClick={item.onClick}
            type="button"
          >
            <span className={styles["item-icon"]}>
              <Icon
                name={item.icon}
                color={activeItemId === item.id ? "primary" : "secondary-text"}
                size="sm"
              />
            </span>
            <span className={styles["item-label"]}>{item.label}</span>
          </ButtonUnstyled>
        );
      })}
    </nav>
  );
};

export default BottomNav;
