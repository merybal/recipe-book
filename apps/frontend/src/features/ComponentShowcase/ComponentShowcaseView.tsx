/**
 * Internal component showcase (rudimentary Storybook).
 * For local use only — add to .gitignore if you don't want to commit it.
 * Route: /components
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import ButtonUnstyled from "@/design-system/components/ButtonUnstyled";
import BottomSheet from "@/design-system/components/BottomSheet";
import Checkbox from "@/design-system/components/Checkbox/Checkbox";
import CheckboxGroup from "@/design-system/components/CheckboxGroup";
import Radio from "@/design-system/components/Radio";
import RadioGroup from "@/design-system/components/RadioGroup";
import DragAndDrop from "@/design-system/components/DragAndDrop";
import EditableInput from "@/design-system/components/EditableInput";
import EditableTable from "@/design-system/components/EditableTable";
import EditableTextarea from "@/design-system/components/EditableTextarea";
import Icon from "@/design-system/components/Icon";
import Input from "@/design-system/components/Input";
import MultipleEditableFields from "@/design-system/components/MultipleEditableFields";
import Select from "@/design-system/components/Select";
import Separator from "@/design-system/components/Separator";
import Table from "@/design-system/components/Table";
import Chip from "@/design-system/components/Chip";
import ChipInput from "@/design-system/components/ChipInput";
import Tabs, { Tab } from "@/design-system/components/Tabs";
import Textarea from "@/design-system/components/Textarea";
import FoodAllergies from "@/features/Recipe/FoodAllergies";

import type { FoodAllergyType } from "@/types";
import type { EditableFieldType } from "@/design-system/components/MultipleEditableFields";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section style={{ marginBottom: "2rem" }}>
    <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>{title}</h2>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  </section>
);

const ComponentShowcaseView = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState("a");
  const [radioGroupValue, setRadioGroupValue] = useState("salado");
  const [dragFiles, setDragFiles] = useState<File[]>([]);
  const [editableInputValue, setEditableInputValue] =
    useState("Texto editable");
  const [editableTextareaValue, setEditableTextareaValue] =
    useState("Área editable");
  const [tableData, setTableData] = useState([
    { name: "Harina", amount: 200, unit: "g" },
    { name: "Azúcar", amount: 100, unit: "g" },
  ]);
  const [chips, setChips] = useState<string[]>([]);

  const [fields, setFields] = useState<EditableFieldType[]>([
    { key: "name", label: "Nombre", value: "Ejemplo", component: "input" },
    {
      key: "fruit",
      label: "Fruta",
      value: "apple",
      component: "select",
      options: [
        { value: "apple", label: "Manzana" },
        { value: "banana", label: "Banana" },
      ],
    },
  ]);

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <header
        style={{
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <ButtonUnstyled onClick={() => navigate("/")}>← Volver</ButtonUnstyled>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
          Component Showcase (interno)
        </h1>
      </header>

      <Section title="Button">
        <Button label="Primary" onClick={() => {}} />
        <Button label="Secondary" variant="secondary" onClick={() => {}} />
        <Button label="Tertiary" variant="tertiary" onClick={() => {}} />
        <Button label="Text" variant="text" onClick={() => {}} />
        <Button label="Disruptive" disruptive onClick={() => {}} />
        <Button
          label="Disruptive"
          disruptive
          variant="secondary"
          onClick={() => {}}
        />
        <Button
          label="Disruptive"
          disruptive
          variant="tertiary"
          onClick={() => {}}
        />
        <Button
          label="Disruptive"
          disruptive
          variant="text"
          onClick={() => {}}
        />
        <Button label="Con icono" iconLeft="Plus" onClick={() => {}} />
        <Button label="Con icono" iconRight="Plus" onClick={() => {}} />
        <Button
          label="Con icono"
          iconLeft="Plus"
          iconRight="Plus"
          onClick={() => {}}
        />
        <Button label="Medium" size="medium" onClick={() => {}} />
        <Button label="Large" size="large" onClick={() => {}} />
        <Button label="Inline" inline onClick={() => {}} />
      </Section>

      <Section title="ButtonIcon">
        <ButtonIcon icon="Plus" label="Agregar" onClick={() => {}} />
        <ButtonIcon
          icon="Trash2"
          label="Borrar"
          variant="secondary"
          onClick={() => {}}
        />
        <ButtonIcon
          icon="Pencil"
          label="Editar"
          variant="tertiary"
          onClick={() => {}}
        />
        <ButtonIcon icon="X" label="Cerrar" disruptive onClick={() => {}} />
        <ButtonIcon
          icon="Check"
          label="Guardar"
          size="small"
          onClick={() => {}}
        />
        <ButtonIcon
          icon="Image"
          label="Imagen"
          size="large"
          onClick={() => {}}
        />
      </Section>

      <Section title="ButtonUnstyled">
        <ButtonUnstyled onClick={() => {}}>Solo texto</ButtonUnstyled>
        <ButtonUnstyled onClick={() => {}}>🔗 Link-style</ButtonUnstyled>
      </Section>

      <Section title="Icon">
        <Icon name="Plus" size="sm" />
        <Icon name="Check" size="md" />
        <Icon name="Trash2" size="lg" />
        <Icon name="Pencil" color="primary" size="md" />
      </Section>

      <Section title="Input">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <Input
            id="showcase-input"
            label="Etiqueta"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            showLabel
          />
        </div>
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <Input
            id="showcase-input-helper"
            label="Con helper"
            helper="Texto de ayuda"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            showLabel
          />
        </div>
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <Input
            id="showcase-input-error"
            label="Con error"
            error="Campo requerido"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            showLabel
          />
        </div>
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <Input
            id="showcase-input-reset"
            label="Con reset"
            hasReset
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            showLabel
          />
        </div>
      </Section>

      <Section title="Textarea">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <Textarea
            id="showcase-textarea"
            label="Descripción"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            showLabel
            rows={3}
          />
        </div>
      </Section>

      <Section title="Select">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <Select
            id="showcase-select"
            label="Fruta"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            options={[
              { value: "apple", label: "Manzana" },
              { value: "banana", label: "Banana" },
              { value: "orange", label: "Naranja" },
            ]}
            showLabel
          />
        </div>
      </Section>

      <Section title="Checkbox">
        <Checkbox
          id="showcase-checkbox"
          label="Acepto términos"
          checked={checkboxChecked}
          onChange={(e) => setCheckboxChecked(e.target.checked)}
        />
        <Checkbox
          id="showcase-checkbox-helper"
          label="Con helper"
          helper="Texto de ayuda"
        />
        <Checkbox
          id="showcase-checkbox-error"
          label="Con error"
          error="Debe aceptar"
        />
      </Section>

      <Section title="CheckboxGroup">
        <CheckboxGroup
          name="showcase-checkboxgroup"
          label="Alergias alimentarias"
          options={[
            { value: "glutenFree", label: "Sin gluten" },
            { value: "dairyFree", label: "Sin lactosa" },
            { value: "vegetarian", label: "Vegetariano" },
            { value: "vegan", label: "Vegano" },
          ]}
          value={checkboxGroupValue}
          onChange={setCheckboxGroupValue}
        />
        <CheckboxGroup
          name="showcase-checkboxgroup-helper"
          label="Con helper"
          options={[
            { value: "a", label: "Opción A" },
            { value: "b", label: "Opción B" },
          ]}
          value={[]}
          onChange={() => {}}
          helper="Podés elegir varias"
        />
        <CheckboxGroup
          name="showcase-checkboxgroup-required"
          label="Con required"
          options={[
            { value: "x", label: "Opción X" },
            { value: "y", label: "Opción Y" },
          ]}
          value={[]}
          onChange={() => {}}
          required
        />
      </Section>

      <Section title="Radio">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Radio
            id="showcase-radio-a"
            name="showcase-radio"
            value="a"
            label="Opción A"
            checked={radioValue === "a"}
            onChange={(e) => setRadioValue(e.target.value)}
          />
          <Radio
            id="showcase-radio-b"
            name="showcase-radio"
            value="b"
            label="Opción B"
            checked={radioValue === "b"}
            onChange={(e) => setRadioValue(e.target.value)}
          />
          <Radio
            id="showcase-radio-c"
            name="showcase-radio"
            value="c"
            label="Opción C (deshabilitada)"
            checked={radioValue === "c"}
            onChange={(e) => setRadioValue(e.target.value)}
            disabled
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Radio
            id="showcase-radio-helper"
            name="showcase-radio-helper"
            value="x"
            label="Con helper"
            helper="Texto de ayuda"
          />
          <Radio
            id="showcase-radio-error"
            name="showcase-radio-error"
            value="y"
            label="Con error"
            error="Seleccioná una opción"
          />
        </div>
      </Section>

      <Section title="RadioGroup">
        <RadioGroup
          name="showcase-radiogroup"
          label="Categoría"
          options={[
            { value: "salado", label: "Salado" },
            { value: "dulce", label: "Dulce" },
          ]}
          value={radioGroupValue}
          onChange={(e) => setRadioGroupValue(e.target.value)}
        />
        <RadioGroup
          name="showcase-radiogroup-helper"
          label="Con helper"
          options={[
            { value: "a", label: "Opción A" },
            { value: "b", label: "Opción B" },
          ]}
          value="a"
          onChange={() => {}}
          helper="Elegí una opción"
        />
        <RadioGroup
          name="showcase-radiogroup-error"
          label="Con error"
          options={[
            { value: "x", label: "Opción X" },
            { value: "y", label: "Opción Y" },
          ]}
          value=""
          onChange={() => {}}
          error="Seleccioná una opción"
        />
      </Section>

      <Section title="Chip">
        <Chip>Estático</Chip>
        <Chip>Con texto</Chip>
        <Chip onRemove={() => {}}>Con X (removible)</Chip>
        <Chip onClick={() => {}}>Con click (clickable)</Chip>
      </Section>

      <Section title="ChipInput">
        <div style={{ width: "100%", maxWidth: "24rem" }}>
          <ChipInput
            id="showcase-chip-input"
            label="Etiquetas"
            placeholder="Escribí y Enter o coma"
            value={chips}
            onChange={setChips}
            showLabel
            helper="Agregá chips con Enter o coma. Backspace vacío borra el último."
          />
        </div>
      </Section>

      <Section title="FoodAllergies">
        <FoodAllergies
          allergies={
            [
              "glutenFree",
              "dairyFree",
              "vegan",
              "vegetarian",
            ] as FoodAllergyType[]
          }
        />
        <FoodAllergies
          allergies={["vegetarian"] as FoodAllergyType[]}
        />
      </Section>

      <Section title="Tabs">
        <div style={{ width: "100%" }}>
          <Tabs id="showcase-tabs" defaultValue="overview">
            <Tab value="overview" label="Overview">
              <div
                style={{
                  padding: "1rem",
                  background: "var(--color-disabled)",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--color-main-text)",
                }}
              >
                Yangnyeom is crispy fried chicken coated in a sweet and spicy
                sauce.
              </div>
            </Tab>
            <Tab value="ingredients" label="Ingredients">
              <div
                style={{
                  padding: "1rem",
                  background: "var(--color-disabled)",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--color-main-text)",
                }}
              >
                Chicken, gochujang, soy sauce, garlic, ginger, sesame oil,
                sugar.
              </div>
            </Tab>
            <Tab value="directions" label="Directions">
              <div
                style={{
                  padding: "1rem",
                  background: "var(--color-disabled)",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "var(--color-main-text)",
                }}
              >
                1. Fry the chicken. 2. Mix the sauce. 3. Toss and serve.
              </div>
            </Tab>
          </Tabs>
        </div>
      </Section>

      <Section title="Separator">
        <div style={{ width: "100%" }}>
          <Separator />
          <Separator />
          <Separator />
          <div
            style={{ display: "flex", height: "4rem", alignItems: "stretch" }}
          >
            <Separator />
            <span style={{ padding: "0 1rem" }}>Texto</span>
            <Separator />
          </div>
        </div>
      </Section>

      <Section title="Table (read-only)">
        <div style={{ width: "100%", overflow: "auto" }}>
          <Table
            columns={[
              { key: "name", header: "Nombre" },
              { key: "amount", header: "Cantidad" },
              { key: "unit", header: "Unidad" },
            ]}
            data={tableData}
            hasCellBorders
          />
        </div>
      </Section>

      <Section title="EditableInput">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <EditableInput
            id="showcase-editable-input"
            label="Campo editable"
            value={editableInputValue}
            onChange={setEditableInputValue}
            showLabel
          />
        </div>
      </Section>

      <Section title="EditableTextarea">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <EditableTextarea
            id="showcase-editable-textarea"
            label="Área editable"
            value={editableTextareaValue}
            onChange={setEditableTextareaValue}
            showLabel
          />
        </div>
      </Section>

      <Section title="MultipleEditableFields">
        <div style={{ width: "100%", maxWidth: "24rem" }}>
          <MultipleEditableFields
            fields={fields}
            singleLabel="Datos de ejemplo"
            onChange={(updated) => {
              setFields((prev) =>
                prev.map((f) => ({ ...f, value: updated[f.key] ?? f.value })),
              );
            }}
          />
        </div>
      </Section>

      <Section title="EditableTable">
        <div style={{ width: "100%", overflow: "auto" }}>
          <EditableTable
            columns={[
              { key: "name", header: "Ingrediente", inputType: "text" },
              { key: "amount", header: "Cantidad", inputType: "number" },
              { key: "unit", header: "Unidad", inputType: "text" },
            ]}
            data={tableData}
            onEdit={(row, index) => {
              setTableData((prev) =>
                prev.map((r, i) => (i === index ? row : r)),
              );
            }}
            onAdd={() =>
              setTableData((prev) => [
                ...prev,
                { name: "", amount: 0, unit: "" },
              ])
            }
            onDelete={(index) =>
              setTableData((prev) => prev.filter((_, i) => i !== index))
            }
          />
        </div>
      </Section>

      <Section title="DragAndDrop">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <DragAndDrop
            accept=".pdf,.txt"
            value={dragFiles}
            onChange={setDragFiles}
            showFilePreviews
            maxFileAmount={3}
          />
        </div>
      </Section>

      {/* {      <Section title="BottomSheet">
        <div style={{ width: "100%", maxWidth: "20rem" }}>
          <BottomSheet>
            <p>Contenido del bottom sheet. Arrastrá hacia arriba/abajo (touch).</p>
          </BottomSheet>
        </div>
      </Section>} */}
    </div>
  );
};

export default ComponentShowcaseView;
