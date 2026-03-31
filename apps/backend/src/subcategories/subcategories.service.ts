import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    locale?: string,
    categoryId?: number,
    hasRecipes?: boolean,
  ) {
    const subcategories = await this.prisma.subcategories.findMany({
      where: {
        deleted_at: null,
        ...(categoryId != null && {
          category_subcategories: {
            some: { category_id: categoryId },
          },
        }),
        ...(hasRecipes === true && {
          recipe_subcategories: {
            some: {
              deleted_at: null,
              recipe: {
                deleted_at: null,
                is_test: false,
              },
            },
          },
        }),
      },
      orderBy: { name_es: 'asc' },
    });
    const useEn = locale === 'en';
    return subcategories.map((s) => ({
      id: s.id,
      name: useEn ? s.name_en : s.name_es,
      name_en: s.name_en,
      name_es: s.name_es,
    }));
  }

  async findOne(id: number, locale?: string) {
    const s = await this.prisma.subcategories.findFirst({
      where: { id, deleted_at: null },
    });
    if (!s) {
      return null;
    }
    const useEn = locale === 'en';
    return {
      id: s.id,
      name: useEn ? s.name_en : s.name_es,
      name_en: s.name_en,
      name_es: s.name_es,
    };
  }
}
