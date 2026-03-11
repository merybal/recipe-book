import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(locale?: string, categoryId?: number) {
    const subcategories = await this.prisma.subcategories.findMany({
      where: {
        deleted_at: null,
        ...(categoryId != null && {
          category_subcategories: {
            some: { category_id: categoryId },
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
}
