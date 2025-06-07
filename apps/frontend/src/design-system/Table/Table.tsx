import clsx from "clsx";

import type { TableProps } from "./Table.types";

import styles from "./Table.module.scss";

const Table = <T extends object>({
  className,
  columns,
  data,
  hasCellBorders,
  isRowReadonly,
  rowClassName,
  ...rest
}: TableProps<T>): JSX.Element => {
  console.log("rowclass", rowClassName);
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
          {data.map((row, rowIndex) => {
            const rowClass = rowClassName?.(row, rowIndex);
            const isReadonly = isRowReadonly?.(row, rowIndex);

            return (
              <tr
                className={clsx(
                  styles["body-row"],
                  { [styles["read-only-row"]]: isReadonly },
                  rowClass
                )}
                key={rowIndex}
              >
                {columns.map((column, columnIndex) => (
                  <td className={styles["body-cell"]} key={String(column.key)}>
                    <div
                      className={clsx(styles["body-cell-data"], {
                        [styles["custom-row"]]: !!rowClass,
                      })}
                    >
                      {column.render
                        ? column.render(
                            row[column.key],
                            row,
                            rowIndex,
                            columnIndex
                          )
                        : String(row[column.key])}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
