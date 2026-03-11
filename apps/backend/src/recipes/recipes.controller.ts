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
import { CreateRecipeWithRelationsDto } from './dto/create-recipe-with-relations.dto';
import { AddDietaryRestrictionsDto } from '@/dietary-restrictions/dto/add-dietary-restrictions.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post(':id/dietary-restrictions')
  async addDietaryRestrictions(
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: AddDietaryRestrictionsDto,
  ) {
    return this.recipesService.addDietaryRestrictions(
      recipeId,
      dto.dietaryRestrictionIds,
    );
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

  @Post('full')
  async createFullRecipe(
    @Body() CreateRecipeWithRelationsDto: CreateRecipeWithRelationsDto,
  ) {
    return this.recipesService.createFullRecipe(CreateRecipeWithRelationsDto);
  }
}
