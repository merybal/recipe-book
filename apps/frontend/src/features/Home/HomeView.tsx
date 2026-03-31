import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { PreviewData } from "@/features/Home/TileGrid";
import Chip from "@/design-system/components/Chip";
import BottomNav from "@/design-system/components/BottomNav";
import Box from "@/design-system/components/Box";
import Spinner from "@/design-system/components/Spinner";
import TileGrid from "@/features/Home/TileGrid";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocale } from "@/hooks/useLocale";
import { mapApiRecipeToPreviewData } from "@/utils/recipe-to-preview-data";

import styles from "./HomeView.module.scss";
import homeLogo from "@/assets/Logo-provisorio.png";

type CategoryRow = {
  id: number;
  name: string;
  name_en: string;
  name_es: string;
};

const GENERIC_ERROR =
  "Algo salió mal. Intentá de nuevo más tarde.";

const HomeView = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const locale = useLocale();
  const localeParam = locale === "es" ? "es" : "en";
  const allRecipesChipLabel =
    locale === "es" ? "Todas las recetas" : "All recipes";

  const [categories, setCategories] = useState<CategoryRow[]>([]);
  /** Avoid showing "Todas las recetas" as selected before the first categories response (default is Salado). */
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [tiles, setTiles] = useState<PreviewData[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadCategories() {
      try {
        const res = await axios.get("/api/categories", {
          params: { locale: localeParam },
        });
        if (cancelled) return;
        const data = res.data as CategoryRow[];
        setCategories(data);
        setCategoriesLoaded(true);
        setSelectedCategoryId((prev) => {
          if (prev !== null) return prev;
          const salado = data.find((c) => c.name_es === "Salado");
          return salado?.id ?? null;
        });
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }
    void loadCategories();
    return () => {
      cancelled = true;
    };
  }, [localeParam]);

  useEffect(() => {
    let cancelled = false;
    async function loadTiles() {
      if (categories.length === 0) return;
      setLoading(true);
      setError(false);
      try {
        if (selectedCategoryId === null) {
          const res = await axios.get("/api/recipes");
          if (cancelled) return;
          setTiles(res.data.map(mapApiRecipeToPreviewData));
        } else {
          const params: Record<string, string> = {
            locale: localeParam,
            has_recipes: "true",
            category_id: String(selectedCategoryId),
          };
          const res = await axios.get("/api/subcategories", { params });
          if (cancelled) return;
          setTiles(
            res.data.map((s: { id: number; name: string }) => ({
              id: s.id,
              title: s.name,
            })),
          );
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void loadTiles();
    return () => {
      cancelled = true;
    };
  }, [localeParam, selectedCategoryId, categories.length]);

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
      {isMobile && (
        <header className={styles.header}>
          <img
            src={homeLogo}
            alt="Recipe book"
            className={styles.logo}
          />
        </header>
      )}

      <h1 className={styles.pageTitle}>Recetas</h1>

      <div className={styles.chipRow}>
        {categories.map((c) => (
          <Chip
            key={c.id}
            selected={selectedCategoryId === c.id}
            onClick={() =>
              setSelectedCategoryId((prev) => (prev === c.id ? null : c.id))
            }
          >
            {c.name}
          </Chip>
        ))}
        <Chip
          key="all-recipes"
          selected={selectedCategoryId === null && categoriesLoaded}
          onClick={() => setSelectedCategoryId(null)}
        >
          {allRecipesChipLabel}
        </Chip>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {GENERIC_ERROR}
        </p>
      )}

      {loading && !error && <Spinner />}

      {!error && !loading && tiles.length === 0 && (
        <p className={styles.empty}>
          {selectedCategoryId === null
            ? locale === "es"
              ? "No hay recetas para mostrar."
              : "No recipes to show."
            : "No hay subcategorías para mostrar."}
        </p>
      )}

      {!error && !loading && tiles.length > 0 && (
        <TileGrid
          previewData={tiles}
          getTileHref={
            selectedCategoryId === null
              ? undefined
              : (id) => `/subcategories/${id}`
          }
        />
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

export default HomeView;
