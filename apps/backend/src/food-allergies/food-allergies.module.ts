import { Module } from '@nestjs/common';
import { FoodAllergiesController } from './food-allergies.controller';
import { FoodAllergiesService } from './food-allergies.service';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a donde tengas el PrismaService

@Module({
  controllers: [FoodAllergiesController],
  providers: [FoodAllergiesService, PrismaService],
})
export class FoodAllergiesModule {}
