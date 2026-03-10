import { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";

import { useLocale } from "@/hooks/useLocale";
import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import Select from "@/design-system/components/Select";
import Separator from "@/design-system/components/Separator";
import Textarea from "@/design-system/components/Textarea";

import type { RecipeStateType, ErrorStateType } from "@/types";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

const MAX_NOTES = 6;

type CountryOption = { value: string; label: string };

type AdditionalInformationStepProps = RecipeStateType & ErrorStateType;

const AdditionalInformationStep = ({
  recipe,
  setRecipe,
  setErrors,
}: AdditionalInformationStepProps) => {
  const locale = useLocale();
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([
    { value: "", label: "Seleccionar país" },
  ]);

  useEffect(() => {
    axios
      .get<{ id: number; name: string }[]>(`/api/countries?locale=${locale}`)
      .then((res) => {
        const options: CountryOption[] = [
          { value: "", label: "Seleccionar país" },
          ...res.data.map((c) => ({ value: String(c.id), label: c.name })),
        ];
        setCountryOptions(options);
      })
      .catch(() => {});
  }, [locale]);

  const notes = recipe.notes ?? [];

  const handleNoteChange = (index: number, value: string) => {
    setRecipe((prev) => {
      const nextNotes = [...(prev.notes ?? [])];
      nextNotes[index] = value;
      return { ...prev, notes: nextNotes };
    });
  };

  const handleAddNote = () => {
    setRecipe((prev) => {
      const current = prev.notes ?? [];
      if (current.length >= MAX_NOTES) return prev;
      const next = current.length === 0 ? ["", ""] : [...current, ""];
      return { ...prev, notes: next };
    });
  };

  const handleRemoveNote = (index: number) => {
    setRecipe((prev) => {
      const nextNotes = (prev.notes ?? []).filter((_, i) => i !== index);
      return { ...prev, notes: nextNotes };
    });
  };

  const handleCountryChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    const countryId = value ? Number(value) : undefined;
    const selectedOption = countryOptions.find((o) => o.value === value);
    setRecipe((prev) => ({
      ...prev,
      countryId,
      countryOfOrigin: selectedOption?.label || undefined,
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.countryOfOrigin;
      return next;
    });
  };

  const notesToShow = notes.length > 0 ? notes : [""];

  return (
    <div>
      <section aria-labelledby="notes-section">
        <header>
          <h2 id="notes-section">Notas</h2>
          <p className={styles["notes-step-helper"]}>
            Agregá acá las notas que quieras (sobre cocción, reemplazo de
            ingredientes, etc.) a la receta.
          </p>
        </header>
        <div className={styles["notes-container"]}>
          {notesToShow.map((note, index) => (
            <div
              key={index}
              className={clsx(
                styles["note-item"],
                index === 0 && styles["note-item--first"],
              )}
            >
              <Textarea
                id={`note-${index}`}
                label={notesToShow.length === 1 ? "Nota" : "Notas"}
                rows={3}
                showLabel={index === 0}
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
              />
              {notesToShow.length > 1 && (
                <ButtonIcon
                  className={styles["note-remove-button"]}
                  disruptive
                  icon="Trash2"
                  label="Eliminar nota"
                  size="small"
                  variant="secondary"
                  onClick={() => handleRemoveNote(index)}
                />
              )}
            </div>
          ))}
          {notes.length < MAX_NOTES && (
            <Button
              type="button"
              label="Agregar nota"
              iconLeft="Plus"
              variant="secondary"
              onClick={handleAddNote}
            />
          )}
        </div>
      </section>
      <Separator />
      <section
        aria-labelledby="country-of-origin-section"
        className={styles.step}
      >
        <h2 id="country-of-origin-section">País de origen</h2>
        <Select
          id="country-of-origin"
          label="País"
          showLabel
          placeholder="Seleccionar país"
          options={countryOptions}
          value={recipe.countryId ? String(recipe.countryId) : ""}
          onChange={handleCountryChange}
        />
      </section>
    </div>
  );
};

export default AdditionalInformationStep;
