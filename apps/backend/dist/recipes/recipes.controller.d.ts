import { RecipesService } from './recipes.service';
import { Prisma } from '../../generated/prisma/client';
import { CreateRecipeDto } from './dto/create-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    createRecipe(data: CreateRecipeDto): Promise<{
        title: string;
        cooking_time: string | null;
        cooking_temperature: number | null;
        servings: string | null;
        mold_type: string | null;
        mold_size: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    getAllRecipes(): Promise<({
        ingredients: {
            id: number;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            name: string;
            subrecipe_title: string | null;
            amount: string | null;
            unit: string | null;
            recipe_id: number;
        }[];
        instructions: {
            id: number;
            created_at: Date;
            updated_at: Date;
            deleted_at: Date | null;
            subrecipe_title: string | null;
            recipe_id: number;
            body: string;
        }[];
    } & {
        title: string;
        cooking_time: string | null;
        cooking_temperature: number | null;
        servings: string | null;
        mold_type: string | null;
        mold_size: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    })[]>;
    getRecipeById(id: number): Promise<{
        title: string;
        cooking_time: string | null;
        cooking_temperature: number | null;
        servings: string | null;
        mold_type: string | null;
        mold_size: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    } | null>;
    updateRecipe(id: number, data: Prisma.RecipesUpdateInput): Promise<{
        title: string;
        cooking_time: string | null;
        cooking_temperature: number | null;
        servings: string | null;
        mold_type: string | null;
        mold_size: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
    deleteRecipe(id: number): Promise<{
        title: string;
        cooking_time: string | null;
        cooking_temperature: number | null;
        servings: string | null;
        mold_type: string | null;
        mold_size: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
    }>;
}
