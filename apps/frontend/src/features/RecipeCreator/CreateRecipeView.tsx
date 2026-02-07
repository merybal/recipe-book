import { useEffect, useState } from "react";
import axios from "axios";

import PageLayout from "@/design-system/components/PageLayout/PageLayout";
import IdmlFileUploader from "@/features/RecipeCreator/IdmlFileUploader";
import RecipeForm from "@/features/RecipeCreator/RecipeForm";
import clsx from "clsx";

import styles from "./CreateRecipeView.module.scss";

const CreateRecipe = () => {
  return (
    <PageLayout
      className={styles["create-recipe-page"]}
      title="Crear nueva receta"
    >
      <RecipeForm />
      {/* <IdmlFileUploader /> */}
    </PageLayout>
  );
};

export default CreateRecipe;
