import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateRecipeWithRelationsDto } from './dto/create-recipe-with-relations.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(dto: CreateRecipeDto) {
    const { category_id, country_id, ...rest } = dto;
    return this.prisma.recipes.create({
      data: {
        ...rest,
        category: { connect: { id: category_id } },
        ...(country_id != null && {
          country: { connect: { id: country_id } },
        }),
      },
    });
  }

  async getRecipeById(id: number) {
    return this.prisma.recipes.findFirst({
      where: { id, deleted_at: null },
      include: {
        category: true,
        country: true,
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
        recipe_dietary_restrictions: {
          where: { deleted_at: null },
          include: {
            dietary_restriction: true,
          },
        },
        recipe_notes: {
          where: { deleted_at: null },
          orderBy: { sort_order: 'asc' },
        },
        recipe_sources: {
          where: { deleted_at: null },
          orderBy: { sort_order: 'asc' },
        },
        recipe_subcategories: {
          where: { deleted_at: null },
          orderBy: { sort_order: 'asc' },
          include: { subcategory: true },
        },
        recipe_tags: {
          where: { deleted_at: null },
          include: { tag: true },
        },
      },
    });
  }

  async getAllRecipes() {
    return this.prisma.recipes.findMany({
      where: { deleted_at: null },
      orderBy: { created_at: 'desc' },
      include: {
        category: true,
        country: true,
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
        recipe_dietary_restrictions: {
          where: { deleted_at: null },
          include: {
            dietary_restriction: true,
          },
        },
        recipe_notes: {
          where: { deleted_at: null },
          orderBy: { sort_order: 'asc' },
        },
        recipe_sources: {
          where: { deleted_at: null },
          orderBy: { sort_order: 'asc' },
        },
        recipe_subcategories: {
          where: { deleted_at: null },
          orderBy: { sort_order: 'asc' },
          include: { subcategory: true },
        },
        recipe_tags: {
          where: { deleted_at: null },
          include: { tag: true },
        },
      },
    });
  }

  async addDietaryRestrictions(
    recipeId: number,
    dietaryRestrictionIds: number[],
  ) {
    const createManyInput = dietaryRestrictionIds.map((dietaryRestrictionId) => ({
      recipe_id: recipeId,
      dietary_restriction_id: dietaryRestrictionId,
    }));

    return this.prisma.recipeDietaryRestrictions.createMany({
      data: createManyInput,
      skipDuplicates: true,
    });
  }

  private async getOrCreateTagIds(tagNames: string[]): Promise<{ tag_id: number }[]> {
    const result: { tag_id: number }[] = [];
    for (const name of tagNames) {
      if (!name?.trim()) continue;
      let tag = await this.prisma.tags.findFirst({
        where: { name: name.trim(), deleted_at: null },
      });
      if (!tag) {
        tag = await this.prisma.tags.create({
          data: { name: name.trim() },
        });
      }
      result.push({ tag_id: tag.id });
    }
    return result;
  }

  async createFullRecipe(dto: CreateRecipeWithRelationsDto) {
    const tagIds = await this.getOrCreateTagIds(dto.tags ?? []);

    return this.prisma.recipes.create({
      data: {
        title: dto.title,
        category: { connect: { id: dto.category_id } },
        ...(dto.country_id != null && {
          country: { connect: { id: dto.country_id } },
        }),
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

        recipe_dietary_restrictions: {
          create: dto.dietary_restriction_ids.map((id) => ({
            dietary_restriction: {
              connect: { id },
            },
          })),
        },

        recipe_notes: {
          create: (dto.notes ?? []).map((content, index) => ({
            content,
            sort_order: index,
          })),
        },

        recipe_sources: {
          create: (dto.source ?? []).map((item, index) => ({
            name: item.name,
            url: item.url,
            sort_order: index,
          })),
        },

        recipe_subcategories: {
          create: (dto.subcategory_ids ?? []).map((subcategoryId, index) => ({
            subcategory: { connect: { id: subcategoryId } },
            sort_order: index,
          })),
        },

        recipe_tags: {
          create: tagIds,
        },
      },
      include: {
        subrecipes: {
          include: {
            ingredients: true,
          },
        },
        recipe_dietary_restrictions: {
          include: {
            dietary_restriction: true,
          },
        },
        recipe_notes: {
          orderBy: { sort_order: 'asc' },
        },
        recipe_sources: {
          orderBy: { sort_order: 'asc' },
        },
        recipe_subcategories: {
          orderBy: { sort_order: 'asc' },
        },
        recipe_tags: {
          include: { tag: true },
        },
      },
    });
  }
}
