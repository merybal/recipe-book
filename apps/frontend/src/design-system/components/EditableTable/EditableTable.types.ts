import type { ColumnType } from "../Table";

export type EditableColumnType<T> = {
  /** Input type for the cell when editing (text, number, or email). */
  inputType?: "text" | "number" | "email";
} & ColumnType<T>;

export type EditableTableProps<T extends object> = {
  /**
   * Label displayed in add row button
   * @default "Agregar"
   */
  addButtonLabel?: string;
  /** Extra CSS class applied to the table container. */
  className?: string;
  /**
   * Eg:
   * const columns: EditableColumnType<IngredientType>[] = [
   *  { key: "name", header: "Ingrediente", inputType: "text" },
   *  { key: "amount", header: "Cantidad", inputType: "number" },
   *  { key: "unit", header: "Unidad", inputType: "text" },
   * ];
   */
  columns: EditableColumnType<T>[];
  /**
   * Eg:
   * const initialData: IngredientType[] = [
   *  { name: "Harina", amount: 200, unit: "gramos" },
   *  { name: "Manzana", amount: 2 },
   *  { name: "Canela", unit: "c/n" },
   * ];
   *
   * Save data in state:
   * const [ingredients, setIngredients] = useState<IngredientType[]>(initialData);
   *
   * Pass data as data={ingredients}
   */
  data: T[];
  /**
   * Eg:
   *  const handleEdit = (updatedRow: IngredientType, index: number) => {
   *   setIngredients((prev) =>
   *     prev.map((item, i) => (i === index ? updatedRow : item))
   *   );
   * };
   */
  onEdit?: (updatedRow: T, rowIndex: number) => void;
  /**
   * Eg:
   * const handleAddIngredient = () => {
   *  setIngredients((prev) => [
   *    ...prev,
   *      { name: "", amount: 0, unit: "" } as IngredientType, // empty or default values
   *    ]);
   * };
   */
  onAdd?: () => void;
  /**
   * Eg:
   * const handleDelete = (index: number) => {
   *   setIngredients((prev) => prev.filter((_, i) => i !== index));
   * };
   */
  onDelete?: (rowIndex: number) => void;
};
