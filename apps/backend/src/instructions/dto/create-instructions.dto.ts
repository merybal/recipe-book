export class CreateInstructionsDto {
  instructions: {
    sectionTitle?: string;
    sectionBody: string[];
  }[];
}
