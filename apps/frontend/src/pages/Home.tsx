import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import type { PreviewData } from "../components/TileGrid";

import styles from "./Home.module.scss";
import TileGrid from "../components/TileGrid";

const Home = () => {
  const [recipePreviews, setRecipePreviews] = useState<PreviewData[]>([]);

  useEffect(() => {
    const fetchRecipePreviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/recipes/recipe-preview-list"
        );
        const mappedData = response.data.map((r: any) => ({
          id: r.id,
          title: r.title,
          imageUrl: r.image_url,
          source: r.source,
          foodAllergies: r.food_allergies,
        }));
        setRecipePreviews(mappedData);

        console.log("Fetched recipe previews:", mappedData);
      } catch (error) {
        console.error("Error fetching recipe previews", error);
      }
    };

    fetchRecipePreviews();
  }, []);

  return (
    <div className={clsx(styles.home)}>
      <p>esto es un HOME</p>
      <TileGrid previewData={recipePreviews} />
    </div>
  );
};

export default Home;
