import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DietaryRestrictions } from '../generated/prisma';

@Injectable()
export class DietaryRestrictionsService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<DietaryRestrictions> {
    return this.prisma.dietaryRestrictions.create({
      data: { name },
    });
  }

  async getDietaryRestrictions(): Promise<DietaryRestrictions[]> {
    return this.prisma.dietaryRestrictions.findMany({
      where: { deleted_at: null },
      orderBy: { name: 'asc' },
    });
  }
}
