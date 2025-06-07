import type { ReactNode, TableHTMLAttributes } from "react";

export type ColumnType<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export type EditableTableProps<T> = {
  className?: string;
  columns: ColumnType<T>[];
  data: T[];
  hasCellBorders?: boolean;
} & TableHTMLAttributes<HTMLTableElement>;
