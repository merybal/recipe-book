import { useEffect, useState } from "react";
import axios from "axios";

import PageLayout from "@/components/Common/PageLayout";
import IdmlFileUploader from "@/components/RecipeCreator/IdmlFileUploader";
import RecipeForm from "@/components/RecipeCreator/RecipeForm";
import clsx from "clsx";

import styles from "./CreateRecipe.module.scss";

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
