import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import Button from "@/design-system/components/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import homeLogo from "@/assets/Logo-provisorio.png";

import styles from "./DesktopNav.module.scss";

function isRecetasPath(pathname: string): boolean {
  if (pathname === "/") return true;
  if (/^\/recipes\/\d+$/.test(pathname)) return true;
  if (/^\/recipes\/\d+\/pdf-preview$/.test(pathname)) return true;
  return false;
}

const DesktopNav = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  if (isMobile) {
    return null;
  }

  const recetasActive = isRecetasPath(pathname);

  return (
    <nav
      className={styles.nav}
      role="navigation"
      aria-label="Menú principal"
    >
      <Link to="/" className={styles.brand}>
        <img
          src={homeLogo}
          alt="Recipe book"
          className={styles.logo}
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link
            to="/"
            className={clsx(styles.link, recetasActive && styles.linkActive)}
          >
            Recetas
          </Link>
        </li>
        <li>
          <Button
            label="Nueva receta"
            href="/create-recipe"
            variant="primary"
            inline
          />
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
