import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import RecipeForm from "./components/RecipeForm";
import FileUploadIDML from "./components/FileUploadIDML";
import Button from "./design-system/Button";
import BottomSheet from "./design-system/BottomSheet";
import Recipe from "./pages/Recipe";

import { recipe } from "@/mock/mock-data";

import Separator from "./design-system/Separator";
import Logo from "@/assets/Logo.png";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      {/* <header className={styles["app-header"]}>
        <img className={styles.logo} src={Logo} alt="banner" />
      </header> */}
      {/* <h2>Receta</h2> */}
      {/* <FileUploadIDML />
      <Separator /> */}
      <Recipe recipe={recipe} />
      {/* <Button label="Button" onClick={() => console.log("clickety click")} /> */}
      {/* <RecipeForm /> */}
      {/* <FileUpload /> */}
      {/* <Recipe /> */}
      {/* <button onClick={() => setOpen(true)}>Abrir BottomSheet</button> */}
      {/* <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
        <h2>Opciones</h2>
        <p>Contenido del sheet.</p>
        <button onClick={() => setOpen(false)}>Cerrar</button>
      </BottomSheet> */}
    </div>
  );
}

export default App;
