import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Prisma } from '../../generated/prisma/client';

import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  // Recipes
  @Post()
  async createRecipe(@Body() data: CreateRecipeDto) {
    return this.recipesService.createRecipe(data);
  }

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.getRecipeById(id);
  }

  @Put(':id')
  async updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.RecipesUpdateInput,
  ) {
    return this.recipesService.updateRecipe(id, data);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.deleteRecipe(id);
  }
}
