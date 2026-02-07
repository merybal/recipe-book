export type ProcessFilesParams = {
  files: FileList;
  currentValue: File[];
  accept?: string;
  maxFileSize?: number;
  maxFileAmount?: number;
  multiple?: boolean;
};

export type ProcessFilesResult = {
  acceptedFiles: File[];
  errors: string[];
};

export function processFiles({
  files,
  currentValue,
  accept,
  maxFileSize,
  maxFileAmount,
  multiple,
}: ProcessFilesParams): ProcessFilesResult {
  let newFiles = Array.from(files);
  const errors: string[] = [];

  if (accept) {
    const acceptedTypes = accept.split(",").map((t) => t.trim());
    newFiles = newFiles.filter((file) => {
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.endsWith(type);
        }
        if (type.endsWith("/*")) {
          const baseType = type.split("/")[0];
          return file.type.startsWith(baseType + "/");
        }
        return file.type === type;
      });

      if (!isAccepted) {
        errors.push(`Tipo de archivo no permitido: ${file.name}`);
      }

      return isAccepted;
    });
  }

  if (maxFileSize) {
    newFiles = newFiles.filter((file) => {
      if (file.size > maxFileSize) {
        errors.push(
          `El archivo ${file.name} excede el tamaño máximo de ${Math.round(
            maxFileSize / 1024 / 1024
          )}MB`
        );
        return false;
      }
      return true;
    });
  }

  if (maxFileAmount && currentValue.length + newFiles.length > maxFileAmount) {
    const cantidadDisponible = maxFileAmount - currentValue.length;
    errors.push(`Podés subir hasta ${maxFileAmount} archivos en total`);
    newFiles = newFiles.slice(0, cantidadDisponible);
  }

  newFiles = newFiles.filter((file) => {
    const isDuplicate = currentValue.some(
      (existing) => existing.name === file.name && existing.size === file.size
    );
    if (isDuplicate) {
      errors.push(`Archivo duplicado: ${file.name}`);
      return false;
    }
    return true;
  });

  const acceptedFiles = multiple
    ? [...currentValue, ...newFiles]
    : [newFiles[0]].filter(Boolean);

  return { acceptedFiles, errors };
}
