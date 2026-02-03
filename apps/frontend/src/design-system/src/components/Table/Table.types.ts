import type { ReactNode, TableHTMLAttributes } from "react";

export type ColumnType<T> = {
  /** Key of the column (matches a key in the row data). */
  key: keyof T;
  /** Header text for the column. */
  header: string;
  /** Optional width (e.g. "20rem"). */
  width?: string;
  /** Custom cell renderer; receives value, row, rowIndex, columnIndex. */
  render?: (
    value: T[keyof T],
    row: T,
    rowIndex?: number,
    columnIndex?: number
  ) => ReactNode;
};

export type TableProps<T> = {
  /** Extra CSS class applied to the table container. */
  className?: string;
  /** Column definitions. */
  columns: ColumnType<T>[];
  /** Row data. */
  data: T[];
  /** When true, cells have borders. */
  hasCellBorders?: boolean;
  /** When true, table uses fixed width layout. */
  hasfixedWidth?: boolean;
  /** Returns true if the row should be read-only (e.g. not editable). */
  isRowReadonly?: (row: T, rowIndex: number) => boolean;
  /** Returns optional CSS class for each row. */
  rowClassName?: (row: T, rowIndex: number) => string | undefined;
} & TableHTMLAttributes<HTMLTableElement>;
