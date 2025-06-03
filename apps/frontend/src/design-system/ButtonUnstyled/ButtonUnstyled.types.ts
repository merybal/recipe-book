import { ButtonHTMLAttributes } from "react";

export type ButtonUnstyledProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;
