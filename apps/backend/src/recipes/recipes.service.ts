import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateRecipeWithRelationsDto } from './dto/create-recipe-with-relations.dto';

/** Spanish alphabetical order (Ñ after N, not at end of list). */
const TITLE_SORT_ES = new Intl.Collator('es', { usage: 'sort' });

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
    const recipes = await this.prisma.recipes.findMany({
      where: { deleted_at: null, is_test: false },
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
    recipes.sort((a, b) => TITLE_SORT_ES.compare(a.title, b.title));
    return recipes;
  }

  async getRecipesBySubcategoryId(subcategoryId: number) {
    const recipes = await this.prisma.recipes.findMany({
      where: {
        deleted_at: null,
        is_test: false,
        recipe_subcategories: {
          some: {
            subcategory_id: subcategoryId,
            deleted_at: null,
          },
        },
      },
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
    recipes.sort((a, b) => TITLE_SORT_ES.compare(a.title, b.title));
    return recipes;
  }

  async getRecipesByCategoryId(categoryId: number) {
    const recipes = await this.prisma.recipes.findMany({
      where: {
        deleted_at: null,
        is_test: false,
        category_id: categoryId,
      },
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
    recipes.sort((a, b) => TITLE_SORT_ES.compare(a.title, b.title));
    return recipes;
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
        ...(dto.introduction != null && { introduction: dto.introduction }),
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

  async updateFullRecipe(recipeId: number, dto: CreateRecipeWithRelationsDto) {
    const tagIds = await this.getOrCreateTagIds(dto.tags ?? []);

    const existingRecipe = await this.prisma.recipes.findFirst({
      where: { id: recipeId, deleted_at: null },
      include: { subrecipes: true },
    });

    if (!existingRecipe) {
      throw new NotFoundException('Recipe not found');
    }

    const subrecipeIds = existingRecipe.subrecipes.map((s) => s.id);

    return this.prisma.$transaction(async (tx) => {
      await tx.ingredients.deleteMany({
        where: { subrecipe_id: { in: subrecipeIds } },
      });
      await tx.subrecipes.deleteMany({
        where: { recipe_id: recipeId },
      });
      await tx.recipeNotes.deleteMany({
        where: { recipe_id: recipeId },
      });
      await tx.recipeSources.deleteMany({
        where: { recipe_id: recipeId },
      });
      await tx.recipeDietaryRestrictions.deleteMany({
        where: { recipe_id: recipeId },
      });
      await tx.recipeSubcategories.deleteMany({
        where: { recipe_id: recipeId },
      });
      await tx.recipeTags.deleteMany({
        where: { recipe_id: recipeId },
      });

      return tx.recipes.update({
        where: { id: recipeId },
        data: {
          title: dto.title,
          category: { connect: { id: dto.category_id } },
          ...(dto.country_id != null
            ? { country: { connect: { id: dto.country_id } } }
            : { country: { disconnect: true } }),
          cooking_time: dto.cooking_time,
          cooking_temperature: dto.cooking_temperature,
          servings: dto.servings,
          mold_type: dto.mold_type,
          mold_size: dto.mold_size,
          ...(dto.introduction != null && { introduction: dto.introduction }),
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
              dietary_restriction: { connect: { id } },
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
    });
  }
}
