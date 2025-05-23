import { PrismaService } from '../prisma/prisma.service';
import { Recipes, Prisma } from '../../generated/prisma/client';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';
export declare class RecipesService {
  private prisma;
  constructor(prisma: PrismaService);
  createRecipe(data: CreateRecipeDto): Promise<{
    id: number;
    title: string;
    cooking_time: string | null;
    cooking_temperature: number | null;
    servings: string | null;
    mold_type: string | null;
    mold_size: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  }>;
  getAllRecipes(): Promise<
    ({
      ingredients: {
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
        name: string;
        recipe_id: number;
        subrecipe_title: string | null;
        amount: string | null;
        unit: string | null;
      }[];
      instructions: {
        id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
        recipe_id: number;
        subrecipe_title: string | null;
        body: string;
      }[];
    } & {
      id: number;
      title: string;
      cooking_time: string | null;
      cooking_temperature: number | null;
      servings: string | null;
      mold_type: string | null;
      mold_size: string | null;
      created_at: Date;
      updated_at: Date;
      deleted_at: Date | null;
    })[]
  >;
  getRecipeById(id: number): Promise<Recipes | null>;
  updateRecipe(id: number, data: Prisma.RecipesUpdateInput): Promise<Recipes>;
  deleteRecipe(id: number): Promise<Recipes>;
  addInstructions(
    recipeId: number,
    data: CreateInstructionsDto,
  ): Promise<Prisma.BatchPayload>;
}
