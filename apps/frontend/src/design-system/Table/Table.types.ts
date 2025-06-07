import type { ReactNode, TableHTMLAttributes } from "react";

export type ColumnType<T> = {
  key: keyof T;
  header: string;
  render?: (
    value: T[keyof T],
    row: T,
    rowIndex?: number,
    columnIndex?: number
  ) => ReactNode;
};

export type TableProps<T> = {
  className?: string;
  columns: ColumnType<T>[];
  data: T[];
  hasCellBorders?: boolean;
  isRowReadonly?: (row: T, rowIndex: number) => boolean;
  rowClassName?: (row: T, rowIndex: number) => string | undefined;
} & TableHTMLAttributes<HTMLTableElement>;
