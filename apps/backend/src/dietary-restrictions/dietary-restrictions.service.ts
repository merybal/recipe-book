import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DietaryRestrictions } from '../generated/prisma';

@Injectable()
export class DietaryRestrictionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: {
    name: string;
    name_en: string;
    name_es: string;
  }): Promise<DietaryRestrictions> {
    return this.prisma.dietaryRestrictions.create({
      data: dto,
    });
  }

  async getDietaryRestrictions(): Promise<DietaryRestrictions[]> {
    return this.prisma.dietaryRestrictions.findMany({
      where: { deleted_at: null },
      orderBy: { name_es: 'asc' },
    });
  }
}
