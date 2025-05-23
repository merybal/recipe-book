import { IngredientsService } from './ingredients.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
export declare class IngredientsController {
    private readonly ingredientsService;
    constructor(ingredientsService: IngredientsService);
    addIngredients(recipeId: number, createIngredientsDto: CreateIngredientsDto): Promise<import("generated/prisma").Prisma.BatchPayload>;
}
