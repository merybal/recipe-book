import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
}
