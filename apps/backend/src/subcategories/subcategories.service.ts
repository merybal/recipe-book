import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subcategories.findMany({
      where: { deleted_at: null },
      orderBy: { name: 'asc' },
    });
  }
}
