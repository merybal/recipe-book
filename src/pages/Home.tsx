import clsx from "clsx";

import styles from "./Home.module.scss";
import TileGrid from "../components/TileGrid";

const Home = () => {
  return (
    <div className={clsx(styles.home)}>
      <p>esto es un HOME</p>
      <TileGrid />
    </div>
  );
};

export default Home;
