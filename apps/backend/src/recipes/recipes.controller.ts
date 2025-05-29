import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { AddFoodAllergiesDto } from '@/food-allergies/dto/add-food-allergies.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post(':id/food-allergies')
  async addFoodAllergies(
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: AddFoodAllergiesDto,
  ) {
    return this.recipesService.addFoodAllergies(recipeId, dto.foodAllergyIds);
  }

  @Get(':id')
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipesService.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.createRecipe(createRecipeDto);
  }
}
