import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async createUnit(name: string) {
    return this.prisma.units.create({
      data: {
        name,
      },
    });
  }

  async getUnits() {
    return this.prisma.units.findMany({
      where: {
        deleted_at: null, // in case you're using soft delete
      },
      orderBy: { name: 'asc' },
    });
  }
}
