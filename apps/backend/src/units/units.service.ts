import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async findAll(locale?: string) {
    const units = await this.prisma.units.findMany({
      where: { deleted_at: null },
      orderBy: { abbreviation_singular: 'asc' },
    });
    const useEn = locale === 'en';
    return units.map((u) => ({
      id: u.id,
      abbreviation_singular: u.abbreviation_singular,
      abbreviation_plural: u.abbreviation_plural,
      name: useEn ? u.name_en : u.name_es,
      name_en: u.name_en,
      name_es: u.name_es,
      synonyms: u.synonyms as string[],
    }));
  }
}
