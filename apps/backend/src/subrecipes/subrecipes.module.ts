import { Module } from '@nestjs/common';
import { SubrecipesController } from './subrecipes.controller';
import { IngredientsController } from './ingredients.controller';
import { SubrecipesService } from './subrecipes.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SubrecipesController, IngredientsController],
  providers: [SubrecipesService, PrismaService],
})
export class SubrecipesModule {}
