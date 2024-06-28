import Recipe from "@/pages/Recipe";
import Logo from "@/assets/Logo.png";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles["app-header"]}>
        <img className={styles.logo} src={Logo} alt="banner" />
      </header>
      <Recipe />
    </div>
  );
}

export default App;
