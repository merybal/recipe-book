import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonUnstyledProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;
