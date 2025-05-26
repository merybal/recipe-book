import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Recipes } from '@prisma/client';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(data: CreateRecipeDto) {
    const {
      title,
      cooking_time,
      cooking_temperature,
      servings,
      mold_type,
      mold_size,
      image_url,
      foodAllergyIds = [],
    } = data;

    const recipe = await this.prisma.recipes.create({
      data: {
        title,
        cooking_time,
        cooking_temperature,
        servings,
        mold_type,
        mold_size,
        image_url,
      },
    });

    if (foodAllergyIds.length) {
      await this.prisma.recipeFoodAllergies.createMany({
        data: foodAllergyIds.map((foodAllergyId) => ({
          recipe_id: recipe.id,
          food_allergy_id: foodAllergyId,
        })),
        skipDuplicates: true,
      });
    }

    return this.getRecipeById(recipe.id); // devolver con relaciones
  }

  async getAllRecipes() {
    const recipes = await this.prisma.recipes.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        ingredients: true,
        instructions: true,
        recipe_food_allergies: {
          include: {
            food_allergy: true,
          },
        },
      },
    });

    return recipes.map((r) => ({
      ...r,
      food_allergies: r.recipe_food_allergies.map((a) => a.food_allergy.name),
    }));
  }

  async getRecipePreviewList() {
    const recipes = await this.prisma.recipes.findMany({
      select: {
        id: true,
        title: true,
        recipe_food_allergies: {
          select: {
            food_allergy: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        deleted_at: null,
      },
    });

    return recipes.map((r) => ({
      id: r.id,
      title: r.title,
      food_allergies: r.recipe_food_allergies.map((a) => a.food_allergy.name),
    }));
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

    // Extraemos solo los campos necesarios
    const { recipe_food_allergies, ...rest } = recipe;

    return {
      ...rest,
      food_allergies: recipe_food_allergies.map((a) => a.food_allergy.name),
    };
  }
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

    // return { message: 'Recipe updated successfully' };
    return await this.getRecipeById(id);
  }

  async addFoodAllergies(recipeId: number, foodAllergyIds: number[]) {
    const data = foodAllergyIds.map((foodAllergyId) => ({
      recipe_id: recipeId,
      food_allergy_id: foodAllergyId,
    }));

    return this.prisma.recipeFoodAllergies.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async deleteRecipe(id: number): Promise<Recipes> {
    return this.prisma.recipes.delete({
      where: { id },
    });
  }
}
