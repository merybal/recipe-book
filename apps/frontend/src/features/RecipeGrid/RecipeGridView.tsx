import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Box from "@/design-system/components/Box";
import Spinner from "@/design-system/components/Spinner";
import BottomNav from "@/design-system/components/BottomNav";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import TileGrid, { type PreviewData } from "@/features/Home/TileGrid";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocale } from "@/hooks/useLocale";
import { mapApiRecipeToPreviewData } from "@/utils/recipe-to-preview-data";

import styles from "./RecipeGridView.module.scss";

const GENERIC_ERROR =
  "Algo salió mal. Intentá de nuevo más tarde.";

const RecipeGridView = () => {
  const navigate = useNavigate();
  const { subcategoryId: subcategoryIdParam } = useParams<{
    subcategoryId: string;
  }>();
  const isMobile = useIsMobile();
  const locale = useLocale();
  const localeParam = locale === "es" ? "es" : "en";

  const [title, setTitle] = useState<string>("");
  const [previews, setPreviews] = useState<PreviewData[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const subcategoryId = subcategoryIdParam
    ? parseInt(subcategoryIdParam, 10)
    : NaN;

  useEffect(() => {
    if (Number.isNaN(subcategoryId)) {
      setError(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const [subRes, recipesRes] = await Promise.all([
          axios.get(`/api/subcategories/${subcategoryId}`, {
            params: { locale: localeParam },
          }),
          axios.get("/api/recipes", {
            params: { subcategory_id: subcategoryId },
          }),
        ]);
        if (cancelled) return;
        setTitle(subRes.data.name ?? "");
        setPreviews(recipesRes.data.map(mapApiRecipeToPreviewData));
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [subcategoryId, localeParam]);

  const bottomNavItems = [
    {
      id: "home",
      label: "Home",
      icon: "Home" as const,
      onClick: () => navigate("/"),
    },
    {
      id: "add",
      label: "Agregar receta",
      icon: "Plus" as const,
      onClick: () => navigate("/create-recipe"),
    },
  ];

  return (
    <Box
      padding="lg"
      flex
      direction="column"
      gap="lg"
      paddingBottom={isMobile ? "8rem" : "lg"}
    >
      <div className={styles.titleRow}>
        <ButtonIcon
          className={styles.backButton}
          icon="ArrowLeft"
          label="Volver"
          size="small"
          variant="tertiary"
          onClick={() => navigate("/")}
        />
        <h1 className={styles.pageTitle}>{title || "…"}</h1>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {GENERIC_ERROR}
        </p>
      )}

      {loading && !error && <Spinner />}

      {!error && !loading && previews.length === 0 && (
        <p className={styles.empty}>No hay recetas en esta subcategoría.</p>
      )}

      {!error && !loading && previews.length > 0 && (
        <TileGrid previewData={previews} />
      )}

      {isMobile && (
        <BottomNav
          items={bottomNavItems}
          activeItemId="home"
          centerItemIndex={1}
        />
      )}
    </Box>
  );
};

export default RecipeGridView;
