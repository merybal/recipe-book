import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(locale?: string) {
    const categories = await this.prisma.categories.findMany({
      where: { deleted_at: null },
      orderBy: { name_es: 'asc' },
    });
    const useEn = locale === 'en';
    return categories.map((c) => ({
      id: c.id,
      name: useEn ? c.name_en : c.name_es,
      name_en: c.name_en,
      name_es: c.name_es,
    }));
  }
}
