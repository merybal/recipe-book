import { useEffect } from "react";
import { RecipePrintPreview } from "@/features/Recipe/RecipePrintPreview";
import type { RecipeType } from "@/types";
import Icon from "@/design-system/components/Icon/Icon";

import styles from "./RecipePdfPreview.module.scss";

type RecipePdfPreviewProps = {
  recipe: RecipeType;
  onClose: () => void;
};

export function RecipePdfPreview({ recipe, onClose }: RecipePdfPreviewProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.header}>
        <h2 className={styles.title}>Vista previa</h2>
        <button
          type="button"
          className={styles["close-button"]}
          onClick={onClose}
          aria-label="Cerrar vista previa"
        >
          <Icon name="X" size="lg" />
        </button>
      </div>
      <div className={styles.viewer}>
        <div className={styles.scrollContent}>
          <RecipePrintPreview recipe={recipe} />
        </div>
      </div>
    </div>
  );
}
