import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Display order for known categories (matches seed: Salado, Dulce, Bebida). */
const CATEGORY_ORDER_ES = ['Salado', 'Dulce', 'Bebida'] as const;

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(locale?: string) {
    const categories = await this.prisma.categories.findMany({
      where: { deleted_at: null },
    });
    const useEn = locale === 'en';
    const mapped = categories.map((c) => ({
      id: c.id,
      name: useEn ? c.name_en : c.name_es,
      name_en: c.name_en,
      name_es: c.name_es,
    }));
    mapped.sort((a, b) => {
      const ia = CATEGORY_ORDER_ES.indexOf(
        a.name_es as (typeof CATEGORY_ORDER_ES)[number],
      );
      const ib = CATEGORY_ORDER_ES.indexOf(
        b.name_es as (typeof CATEGORY_ORDER_ES)[number],
      );
      if (ia === -1 && ib === -1) {
        return a.name_es.localeCompare(b.name_es);
      }
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    return mapped;
  }
}
