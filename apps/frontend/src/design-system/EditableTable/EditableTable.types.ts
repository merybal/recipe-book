import type { ColumnType } from "../Table";

export type EditableTableProps<T extends object> = {
  className?: string;
  columns: ColumnType<T>[];
  data: T[];
  onEdit?: (row: T) => void;
};
