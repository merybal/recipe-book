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
        deleted_at: null, // por si estás usando borrado lógico
      },
      orderBy: { name: 'asc' },
    });
  }
}
