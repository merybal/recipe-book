import { useState } from "react";

import Table from "../Table";
import ButtonIcon from "../ButtonIcon";
import Button from "../Button";
import Input from "../Input";

import type {
  EditableTableProps,
  EditableColumnType,
} from "./EditableTable.types";

import clsx from "clsx";
import styles from "./EditableTable.module.scss";

/* TODO agregar validaciones del input
  que la tabla tenga por lo menos un valor
  que cada columna tenga su propia validacion, como se ve?
  los mensajes de error pasan del padre?
*/

function EditableTable<T extends object>({
  className,
  columns,
  data,
  onEdit,
  onAdd,
  onDelete,
}: EditableTableProps<T>) {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Partial<T>>({});
  const [isNewRow, setIsNewRow] = useState(false);

  const handleEditClick = (index: number) => {
    setEditingRowIndex(index);
    setEditedRow({ ...data[index] });
  };

  const handleInputChange = (
    key: keyof T,
    value: string | number | boolean
  ) => {
    setEditedRow((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveClick = () => {
    if (editingRowIndex !== null) {
      const updatedRow = { ...data[editingRowIndex], ...editedRow };
      onEdit?.(updatedRow, editingRowIndex);
    }
    setEditingRowIndex(null);
    setEditedRow({});
    setIsNewRow(false);
  };

  const handleCancelClick = () => {
    if (isNewRow && editingRowIndex !== null) {
      onDelete?.(editingRowIndex);
    }

    setEditingRowIndex(null);
    setEditedRow({});
    setIsNewRow(false);
  };
  const handleAddClick = () => {
    if (onAdd) {
      onAdd();
      setEditingRowIndex(data.length);
      setEditedRow({});
      setIsNewRow(true);
    }
  };

  const columnsWithEdit: EditableColumnType<T>[] = [
    ...columns.map((column) => {
      const editableColumn = column as EditableColumnType<T>;
      return {
        ...editableColumn,
        render: (
          value: T[keyof T],
          row: T,
          rowIndex?: number,
          columnIndex?: number
        ) => {
          const isEditing = rowIndex != null && editingRowIndex === rowIndex;

          if (isEditing) {
            const cellValue = editedRow[column.key];

            return (
              <Input
                className={clsx(
                  styles["input-container"],
                  rowIndex === data.length - 1 &&
                    columnIndex === 0 &&
                    styles["input-bottom-left-corner"]
                )}
                id={`row-${rowIndex}-${String(column.key)}`}
                label={column.header}
                type={editableColumn.inputType}
                value={String(cellValue ?? "")}
                onChange={(e) => handleInputChange(column.key, e.target.value)}
              />
            );
          }

          return column.render
            ? column.render(value, row, rowIndex)
            : String(value ?? "");
        },
      };
    }),
    {
      key: "__edit" as keyof T,
      header: "",
      width: "7.6rem",
      render: (_value: T[keyof T], _row: T, rowIndex?: number) => {
        const isEditing = rowIndex != null && editingRowIndex === rowIndex;

        return isEditing ? (
          <div className={styles["save-cancel-buttons"]}>
            <ButtonIcon
              icon="check"
              label="Guardar"
              size="small"
              variant="tertiary"
              onClick={handleSaveClick}
            />
            <ButtonIcon
              icon="x"
              label="Cancelar"
              size="small"
              variant="tertiary"
              onClick={handleCancelClick}
            />
          </div>
        ) : (
          <div className={styles["edit-delete-buttons"]}>
            <ButtonIcon
              icon="pencil"
              label="Editar"
              size="small"
              variant="tertiary"
              onClick={() => rowIndex != null && handleEditClick(rowIndex)}
            />
            <ButtonIcon
              icon="trash"
              disruptive
              label="borrar"
              size="small"
              variant="tertiary"
              onClick={() => rowIndex != null && onDelete?.(rowIndex)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className={clsx(styles["editable-table"], className)}>
      <Table<T>
        columns={columnsWithEdit}
        data={data}
        hasCellBorders
        hasfixedWidth
        rowClassName={(row, index) =>
          index === editingRowIndex ? styles["row-editing"] : undefined
        }
        isRowReadonly={(_, index) => index !== editingRowIndex}
      />
      <Button
        label="Agregar ingrediente"
        iconLeft="plus"
        onClick={handleAddClick}
      />
    </div>
  );
}

export default EditableTable;
