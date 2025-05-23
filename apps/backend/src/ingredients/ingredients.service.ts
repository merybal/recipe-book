import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async addIngredientsToRecipe(recipeId: number, data: CreateIngredientsDto) {
    const flattenedIngredients = data.ingredients.flatMap((section) =>
      section.sectionBody.map((item) => ({
        name: item.name,
        amount: item.amount ?? null,
        unit: item.unit ?? null,
        subrecipe_title: section.sectionTitle ?? null,
        recipe_id: recipeId,
      })),
    );

    return this.prisma.ingredients.createMany({
      data: flattenedIngredients,
    });
  }

  async getIngredientsByRecipeId(recipeId: number) {
    return this.prisma.ingredients.findMany({
      where: { recipe_id: recipeId },
    });
  }
}
