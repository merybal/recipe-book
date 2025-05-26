import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Recipes } from '../../generated/prisma/client';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

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

  async getRecipeById(id: number) {
    const recipe = await this.prisma.recipes.findUnique({
      where: { id },
      include: {
        ingredients: true,
        instructions: true,
        recipe_food_allergies: {
          include: { food_allergy: true },
        },
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return recipe;
  }

  // async update(id: number, data: Prisma.RecipesUpdateInput) {
  //   const existing = await this.prisma.recipes.findUnique({ where: { id } });
  //   if (!existing)
  //     throw new NotFoundException(`Recipe with id ${id} not found`);

  //   return this.prisma.recipes.update({
  //     where: { id },
  //     data,
  //   });
  // }

  // async update(id: number, data: UpdateRecipeDto) {
  //   // Verificamos que la receta exista
  //   const recipe = await this.prisma.recipes.findUnique({ where: { id } });

  //   if (!recipe) {
  //     throw new NotFoundException(`Receta con ID ${id} no encontrada`);
  //   }

  //   // Actualizamos la receta
  //   return this.prisma.recipes.update({
  //     where: { id },
  //     data,
  //   });
  // }

  async update(id: number, data: UpdateRecipeDto) {
    const { ingredients, instructions, ...recipeData } = data;

    const updateOps: any = {
      data: recipeData,
      where: { id },
    };

    const existingRecipe = await this.prisma.recipes.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      throw new NotFoundException('Recipe not found');
    }
    // TODO revisar
    const updatedRecipe = await this.prisma.recipes.update(updateOps);

    if (ingredients) {
      await this.prisma.ingredients.deleteMany({ where: { recipe_id: id } });
      await this.prisma.ingredients.createMany({
        data: ingredients.map((i) => ({ ...i, recipe_id: id })),
      });
    }

    if (instructions) {
      await this.prisma.instructions.deleteMany({ where: { recipe_id: id } });
      await this.prisma.instructions.createMany({
        data: instructions.map((i) => ({ ...i, recipe_id: id })),
      });
    }

    return { message: 'Recipe updated successfully' };
  }

  async deleteRecipe(id: number): Promise<Recipes> {
    return this.prisma.recipes.delete({
      where: { id },
    });
  }
}
