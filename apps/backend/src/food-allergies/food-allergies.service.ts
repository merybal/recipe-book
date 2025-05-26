import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a donde tengas el PrismaService
import { FoodAllergies } from '@prisma/client';

@Injectable()
export class FoodAllergiesService {
  constructor(private prisma: PrismaService) {}

  async create(name: string): Promise<FoodAllergies> {
    return this.prisma.foodAllergies.create({
      data: { name },
    });
  }

  async findAll(): Promise<FoodAllergies[]> {
    return this.prisma.foodAllergies.findMany();
  }
}
