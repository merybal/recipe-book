import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
export declare class IngredientsService {
    private prisma;
    constructor(prisma: PrismaService);
    addIngredientsToRecipe(recipeId: number, data: CreateIngredientsDto): Promise<import("generated/prisma").Prisma.BatchPayload>;
}
