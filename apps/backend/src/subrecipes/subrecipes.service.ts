import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubrecipeDto } from './dto/create-subrecipe.dto';

@Injectable()
export class SubrecipesService {
  constructor(private prisma: PrismaService) {}

  async createSubrecipe(recipeId: number, dto: CreateSubrecipeDto) {
    return this.prisma.subrecipes.create({
      data: {
        ...dto,
        recipe: {
          connect: { id: recipeId },
        },
      },
    });
  }

  async addIngredient(
    subrecipeId: number,
    data: { name: string; amount?: string; unit_id: number },
  ) {
    const subrecipe = await this.prisma.subrecipes.findUnique({
      where: { id: subrecipeId },
    });

    if (!subrecipe) {
      throw new NotFoundException('Subrecipe not found');
    }

    return this.prisma.ingredients.create({
      data: {
        name: data.name,
        amount: data.amount,
        unit_id: data.unit_id,
        subrecipe_id: subrecipeId,
      },
    });
  }

  async getSubrecipesByRecipe(recipeId: number) {
    return this.prisma.subrecipes.findMany({
      where: { recipe_id: recipeId, deleted_at: null },
      include: {
        ingredients: {
          where: { deleted_at: null },
          include: {
            units: true, // para traer info de la unidad
          },
        },
      },
    });
  }
}
