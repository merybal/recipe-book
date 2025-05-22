import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.prisma.recipes.create({
      data: createRecipeDto,
    });
  }

  findAll() {
    return this.prisma.recipes.findMany({
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
  }

  findOne(id: number) {
    return this.prisma.recipes.findUnique({
      where: { id },
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
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.prisma.recipes.update({
      where: { id },
      data: updateRecipeDto,
    });
  }

  remove(id: number) {
    return this.prisma.recipes.delete({
      where: { id },
    });
  }
}
