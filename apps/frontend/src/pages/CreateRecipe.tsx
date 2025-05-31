import { useEffect, useState } from "react";
import axios from "axios";

import Input from "@/design-system/Input";
import clsx from "clsx";

import styles from "./CreateRecipe.module.scss";

const CreateRecipe = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={clsx(styles["upload-recipe"])}>
      <Input
        id="1"
        iconLeft="mail"
        placeholder="Emailcito"
        hasReset
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default CreateRecipe;
