import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';

import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AddFoodAllergiesDto } from '@/food-allergies/dto/add-food-allergies.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async createRecipe(@Body() data: CreateRecipeDto) {
    return this.recipesService.createRecipe(data);
  }

  @Get('recipe-preview-list')
  async getRecipePreviewList() {
    return this.recipesService.getRecipePreviewList();
  }

  @Post(':id/food-allergies')
  addFoodAllergies(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AddFoodAllergiesDto,
  ) {
    return this.recipesService.addFoodAllergies(id, body.foodAllergyIds);
  }

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.getRecipeById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipesService.deleteRecipe(id);
  }
}
