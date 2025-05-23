import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Recipes, Prisma } from '../../generated/prisma/client';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(data: CreateRecipeDto) {
    return this.prisma.recipes.create({
      data: {
        title: data.title,
        cooking_time: data.cooking_time,
        cooking_temperature: data.cooking_temperature,
        servings: data.servings,
        mold_type: data.mold_type,
        mold_size: data.mold_size,
      },
    });
  }

  async getAllRecipes() {
    return this.prisma.recipes.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        ingredients: true,
        instructions: true,
      },
    });
  }
  async getRecipeById(id: number): Promise<Recipes | null> {
    return this.prisma.recipes.findUnique({
      where: { id },
    });
  }

  async updateRecipe(
    id: number,
    data: Prisma.RecipesUpdateInput,
  ): Promise<Recipes> {
    return this.prisma.recipes.update({
      where: { id },
      data,
    });
  }

  async deleteRecipe(id: number): Promise<Recipes> {
    return this.prisma.recipes.delete({
      where: { id },
    });
  }

  // instructions
  async addInstructions(recipeId: number, data: CreateInstructionsDto) {
    const instructionsToCreate = data.instructions.flatMap((section) =>
      section.sectionBody.map((body) => ({
        recipe_id: recipeId,
        subrecipe_title: section.sectionTitle,
        body,
      })),
    );

    return this.prisma.instructions.createMany({
      data: instructionsToCreate,
    });
  }
}
