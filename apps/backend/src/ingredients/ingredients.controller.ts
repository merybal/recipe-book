import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';

@Controller('recipes/:recipeId/ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async addIngredients(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() createIngredientsDto: CreateIngredientsDto,
  ) {
    return this.ingredientsService.addIngredientsToRecipe(
      recipeId,
      createIngredientsDto,
    );
  }

  @Get()
  async getIngredientsByRecipeId(
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.ingredientsService.getIngredientsByRecipeId(recipeId);
  }
}
