import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import type { PreviewData } from "../components/TileGrid";
import { Button } from "@/design-system";

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
      } catch (error) {
        console.error("Error fetching recipe previews", error);
      }
    };

    fetchRecipePreviews();
  }, []);

  return (
    <div className={clsx(styles.home)}>
      <Button
        label="Prueba"
        iconLeft="wheat"
        iconRight="wheat"
        onClick={() => console.log("click")}
      />
      <Button
        label="Prueba"
        iconLeft="wheat"
        iconRight="wheat"
        variant="secondary"
        onClick={() => console.log("click")}
      />
      <Button
        label="Prueba"
        iconLeft="wheat"
        iconRight="wheat"
        variant="tertiary"
        onClick={() => console.log("click")}
      />
      <Button
        disruptive
        label="Prueba"
        iconLeft="wheat"
        iconRight="wheat"
        size="small"
        onClick={() => console.log("click")}
      />
      <Button
        disruptive
        label="Prueba"
        iconLeft="wheat"
        iconRight="wheat"
        variant="secondary"
        size="medium"
        onClick={() => console.log("click")}
      />
      <Button
        disruptive
        label="Prueba"
        iconLeft="wheat"
        iconRight="wheat"
        variant="tertiary"
        size="large"
        onClick={() => console.log("click")}
      />
      <p>esto es un HOME</p>
      <TileGrid previewData={recipePreviews} />
    </div>
  );
};

export default Home;
