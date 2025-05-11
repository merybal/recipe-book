// import Recipe from "@/pages/Recipe";
import FileUpload from "./components/FileUpload";
import RecipeForm from "./components/RecipeForm";
import FileUploadIDML from "./components/FileUploadIDML";
import Logo from "@/assets/Logo.png";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
        <img className={styles.logo} src={Logo} alt="banner" />
      </header>
      <h2>Receta</h2>
      <FileUploadIDML />
      {/* <RecipeForm /> */}
      {/* <FileUpload /> */}
      {/* <Recipe /> */}
    </div>
  );
}

export default App;
