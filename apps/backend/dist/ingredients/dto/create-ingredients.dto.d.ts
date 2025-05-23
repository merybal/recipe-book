declare class IngredientItemDto {
    name: string;
    amount?: string;
    unit?: string;
}
declare class IngredientSectionDto {
    sectionTitle?: string;
    sectionBody: IngredientItemDto[];
}
export declare class CreateIngredientsDto {
    ingredients: IngredientSectionDto[];
}
export {};
