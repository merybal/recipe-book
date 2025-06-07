import clsx from "clsx";

import type { EditableTableProps } from "./EditableTable.types";

import styles from "./EditableTable.module.scss";

const EditableTable = <T extends object>({
  className,
  columns,
  data,
  hasCellBorders,
  ...rest
}: EditableTableProps<T>): JSX.Element => {
  return (
    <div
      className={clsx(
        styles["table-container"],
        { [styles["with-borders"]]: hasCellBorders },
        className
      )}
    >
      <table className={styles.table} {...rest}>
        <thead className={styles["table-head"]}>
          <tr className={styles["head-row"]}>
            {columns.map((column) => (
              <th key={String(column.key)}>
                <div className={styles["head-row-cell"]}>{column.header}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr className={styles["body-row"]} key={rowIndex}>
              {columns.map((column) => (
                <td className={styles["body-cell"]} key={String(column.key)}>
                  <div className={styles["body-cell-data"]}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
