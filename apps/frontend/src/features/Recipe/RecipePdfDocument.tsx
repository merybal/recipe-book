import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { RecipeType, SubrecipeType } from "@/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  infoLabel: {
    width: 80,
    fontWeight: "bold",
  },
  ingredientLine: {
    flexDirection: "row",
    marginBottom: 4,
  },
  ingredientAmount: {
    width: 60,
  },
  ingredientName: {
    flex: 1,
  },
  instructionStep: {
    flexDirection: "row",
    marginBottom: 8,
  },
  instructionNumber: {
    width: 24,
    fontWeight: "bold",
  },
  instructionText: {
    flex: 1,
  },
  source: {
    marginTop: 12,
    fontSize: 10,
    color: "#666",
  },
  note: {
    marginBottom: 4,
    fontStyle: "italic",
  },
});

type RecipePdfDocumentProps = {
  recipe: RecipeType;
};

export function RecipePdfDocument({ recipe }: RecipePdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{recipe.title}</Text>

        {/* Información adicional */}
        {(recipe.bakingInstructions ||
          recipe.mold ||
          recipe.servings ||
          (recipe.subcategories && recipe.subcategories.length > 0)) && (
          <View>
            <Text style={styles.sectionTitle}>Información</Text>
            {recipe.bakingInstructions && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cocción:</Text>
                <Text>
                  {[
                    recipe.bakingInstructions.time &&
                      `${recipe.bakingInstructions.time} min`,
                    recipe.bakingInstructions.temperature &&
                      `${recipe.bakingInstructions.temperature}°C`,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </Text>
              </View>
            )}
            {recipe.mold && (recipe.mold.type || recipe.mold.size) && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Molde:</Text>
                <Text>
                  {[recipe.mold.type, recipe.mold.size].filter(Boolean).join(" - ")}
                </Text>
              </View>
            )}
            {recipe.servings && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rinde:</Text>
                <Text>{recipe.servings}</Text>
              </View>
            )}
            {recipe.subcategories && recipe.subcategories.length > 0 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Categoría:</Text>
                <Text>{recipe.subcategories.join(", ")}</Text>
              </View>
            )}
          </View>
        )}

        {/* Subrecetas: ingredientes e instrucciones */}
        {recipe.subrecipes.map((subrecipe: SubrecipeType, idx: number) => (
          <View key={idx}>
            {subrecipe.title && (
              <Text style={styles.sectionTitle}>{subrecipe.title}</Text>
            )}

            {subrecipe.ingredients && subrecipe.ingredients.length > 0 && (
              <>
                <Text style={{ ...styles.sectionTitle, fontSize: 12 }}>
                  Ingredientes
                </Text>
                {subrecipe.ingredients.map((ing, i) => (
                  <View key={i} style={styles.ingredientLine}>
                    <Text style={styles.ingredientAmount}>
                      {ing.amount != null ? `${ing.amount} ${ing.unit || ""}`.trim() : ""}
                    </Text>
                    <Text style={styles.ingredientName}>{ing.name}</Text>
                  </View>
                ))}
              </>
            )}

            {subrecipe.instructions && subrecipe.instructions.length > 0 && (
              <>
                <Text style={{ ...styles.sectionTitle, fontSize: 12 }}>
                  Preparación
                </Text>
                {subrecipe.instructions.map((step, i) => (
                  <View key={i} style={styles.instructionStep}>
                    <Text style={styles.instructionNumber}>{i + 1}.</Text>
                    <Text style={styles.instructionText}>{step}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        ))}

        {/* Notas */}
        {recipe.notes && recipe.notes.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.sectionTitle}>Notas</Text>
            {recipe.notes.map((note, i) => (
              <Text key={i} style={styles.note}>
                • {note}
              </Text>
            ))}
          </View>
        )}

        {/* Fuente */}
        {recipe.source && (recipe.source.name?.length || recipe.source.url?.length) && (
          <View style={styles.source}>
            <Text>
              Fuente:{" "}
              {recipe.source.name?.filter(Boolean).join(", ") ||
                recipe.source.url?.filter(Boolean).join(", ")}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
