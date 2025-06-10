import { ReactNode } from "react";

export type TagProps = {
  className?: string;
  children: ReactNode;
  variant?: "horizontal" | "vertical";
};
