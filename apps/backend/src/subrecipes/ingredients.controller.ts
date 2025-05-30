import { Controller, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { SubrecipesService } from './subrecipes.service';

@Controller('subrecipes')
export class IngredientsController {
  constructor(private readonly subrecipesService: SubrecipesService) {}

  @Post(':id/ingredients')
  addIngredient(
    @Param('id', ParseIntPipe) subrecipeId: number,
    @Body() body: { name: string; amount?: number; unit_id: number },
  ) {
    return this.subrecipesService.addIngredient(subrecipeId, body);
  }
}
