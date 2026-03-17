/**
 * Temporary route for PDF preview while editing the template.
 * Remove when done. Route: /recipes/:id/pdf-preview
 */
import { useParams } from "react-router-dom";

export default function RecipePdfPreviewRoute() {
  const { id } = useParams<{ id: string }>();
  const pdfUrl = `/api/recipes/${id}/pdf-preview`;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "8px 16px",
          background: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          fontSize: "12px",
          color: "#666",
        }}
      >
        PDF preview (temp) — F5 to refresh after template changes
      </div>
      <iframe
        src={pdfUrl}
        title="Recipe PDF Preview"
        style={{ flex: 1, border: "none", width: "100%" }}
      />
    </div>
  );
}
