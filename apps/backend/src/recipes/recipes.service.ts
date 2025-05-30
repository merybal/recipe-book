import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateRecipeWithRelationsDto } from './dto/create-recipe-with-relations.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(data: Prisma.RecipesCreateInput) {
    return this.prisma.recipes.create({
      data,
    });
  }

  async getRecipeById(id: number) {
    return this.prisma.recipes.findFirst({
      where: { id, deleted_at: null },
      include: {
        subrecipes: {
          where: { deleted_at: null },
          include: {
            ingredients: {
              where: { deleted_at: null },
              include: {
                units: true,
              },
            },
          },
        },
        recipe_food_allergies: {
          where: { deleted_at: null },
          include: {
            food_allergy: true,
          },
        },
      },
    });
  }

  async getAllRecipes() {
    return this.prisma.recipes.findMany({
      where: { deleted_at: null },
      orderBy: { created_at: 'desc' },
      include: {
        subrecipes: {
          where: { deleted_at: null },
          include: {
            ingredients: {
              where: { deleted_at: null },
              include: {
                units: true,
              },
            },
          },
        },
        recipe_food_allergies: {
          where: { deleted_at: null },
          include: {
            food_allergy: true,
          },
        },
      },
    });
  }

  async addFoodAllergies(recipeId: number, foodAllergyIds: number[]) {
    const createManyInput = foodAllergyIds.map((foodAllergyId) => ({
      recipe_id: recipeId,
      food_allergy_id: foodAllergyId,
    }));

    return this.prisma.recipeFoodAllergies.createMany({
      data: createManyInput,
      skipDuplicates: true,
    });
  }

  async createFullRecipe(dto: CreateRecipeWithRelationsDto) {
    return this.prisma.recipes.create({
      data: {
        title: dto.title,
        cooking_time: dto.cooking_time,
        cooking_temperature: dto.cooking_temperature,
        servings: dto.servings,
        mold_type: dto.mold_type,
        mold_size: dto.mold_size,
        image_url: dto.image_url,

        subrecipes: {
          create: dto.subrecipes.map((sub) => ({
            title: sub.title,
            instructions: sub.instructions,
            ingredients: {
              create: sub.ingredients.map((ing) => ({
                name: ing.name,
                amount: ing.amount,
                unit_id: ing.unit_id,
              })),
            },
          })),
        },

        recipe_food_allergies: {
          create: dto.food_allergy_ids.map((id) => ({
            food_allergy: {
              connect: { id },
            },
          })),
        },
      },
      include: {
        subrecipes: {
          include: {
            ingredients: true,
          },
        },
        recipe_food_allergies: {
          include: {
            food_allergy: true,
          },
        },
      },
    });
  }
}
