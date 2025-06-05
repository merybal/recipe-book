import { useEffect, useState } from "react";
import axios from "axios";

import PageLayout from "@/components/Common/PageLayout";
import IdmlFileUploader from "@/components/RecipeCreator/IdmlFileUploader";
import clsx from "clsx";

import styles from "./CreateRecipe.module.scss";

const CreateRecipe = () => {
  return (
    <PageLayout title="Crear nueva receta">
      <IdmlFileUploader />
    </PageLayout>
  );
};

export default CreateRecipe;
