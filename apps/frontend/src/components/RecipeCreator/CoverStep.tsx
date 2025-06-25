import DragAndDrop from "@/design-system/src/components/DragAndDrop";
import Input from "@/design-system/src/components/Input";

import type { RecipeStateType } from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./RecipeForm.module.scss";

type CoverStepProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
} & RecipeStateType;

const CoverStep = ({ recipe, setRecipe, files, setFiles }: CoverStepProps) => {
  const isMobile = useIsMobile();

  const getBoxLabelInitial = isMobile
    ? "Agrega la imagen de portada"
    : "Agrega la imagen de portada acá o";

  const getButtonLabelDragAndDrop = isMobile
    ? "Elegí una imagen"
    : "Seleccionála desde tu PC";

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  return (
    <div className={styles.step}>
      <h2>Portada</h2>
      <DragAndDrop
        accept="image/*"
        boxIcon="Image"
        boxLabelInitial={getBoxLabelInitial}
        buttonLabel={getButtonLabelDragAndDrop}
        maxFileAmount={1}
        showSingleImagePreview
        value={files}
        onChange={handleFileChange}
      />

      <Input
        id="title"
        label="Titulo"
        required
        showLabel
        placeholder="Tarta de manzana"
        value={recipe.title}
        onChange={(e) =>
          setRecipe((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />

      <Input
        id="servings"
        label="Rinde"
        showLabel
        placeholder="4 porciones"
        value={recipe.servings}
        onChange={(e) =>
          setRecipe((prev) => ({
            ...prev,
            servings: e.target.value,
          }))
        }
      />
    </div>
  );
};

export default CoverStep;
