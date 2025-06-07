import { useState } from "react";

import Table from "../Table";
import ButtonIcon from "../ButtonIcon";
import Input from "../Input";

import type { EditableTableProps } from "./EditableTable.types";
import type { ColumnType } from "../Table";

import clsx from "clsx";
import styles from "./EditableTable.module.scss";

//TODO agregar validaciones a los input.
//TODO hacer que funcione el edit
//TODO arreglar el ancho de los inputs, que la columna no cambie el tamaño cuando se elije un input.

function EditableTable<T extends object>({
  className,
  columns,
  data,
  onEdit,
}: EditableTableProps<T>) {
  // Estado que guarda la fila actualmente en edición (por ahora sin uso)
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Partial<T>>({});

  const handleEditClick = (index: number) => {
    console.log("edit");
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
      onEdit?.(updatedRow);
    }
    setEditingRowIndex(null);
    setEditedRow({});
  };

  const handleCancelClick = () => {
    setEditingRowIndex(null);
    setEditedRow({});
  };

  // Extendemos las columnas con una columna extra al final
  const columnsWithEdit: ColumnType<T>[] = [
    ...columns.map((column) => {
      return {
        ...column,
        render: (
          value: T[keyof T],
          row: T,
          rowIndex?: number,
          columnIndex?: number
        ) => {
          const isEditing = rowIndex != null && editingRowIndex === rowIndex;

          if (isEditing && column.key in editedRow) {
            const cellValue = editedRow[column.key];
            console.log(column);

            return (
              //TODO agregar type por columna, que venga en props
              <Input
                className={clsx(
                  styles["input-container"],
                  rowIndex === data.length - 1 &&
                    columnIndex === 0 &&
                    styles["input-bottom-left-corner"]
                )}
                id={`row-${rowIndex}`}
                label={column.header}
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
      render: (_value: T[keyof T], _row: T, rowIndex?: number) => {
        const isEditing = rowIndex != null && editingRowIndex === rowIndex;

        return isEditing ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <ButtonIcon
              icon="check"
              label="Guardar"
              size="small"
              variant="primary"
              onClick={handleSaveClick}
            />
            <ButtonIcon
              icon="x"
              label="Cancelar"
              size="small"
              variant="secondary"
              onClick={handleCancelClick}
            />
          </div>
        ) : (
          <ButtonIcon
            icon="pencil"
            label="Editar"
            size="small"
            variant="secondary"
            onClick={() => rowIndex != null && handleEditClick(rowIndex)}
          />
        );
      },
    },
  ];

  return (
    <Table<T>
      className={clsx(styles["editable-table"], className)}
      columns={columnsWithEdit}
      data={data}
      hasCellBorders
      rowClassName={(row, index) =>
        index === editingRowIndex ? styles["row-editing"] : undefined
      }
      isRowReadonly={(_, index) => index !== editingRowIndex}
    />
  );
}

export default EditableTable;
