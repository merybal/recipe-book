import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SubrecipesService } from './subrecipes.service';
import { CreateSubrecipeDto } from './dto/create-subrecipe.dto';

@Controller('recipes/:id/subrecipes')
export class SubrecipesController {
  constructor(private readonly subrecipesService: SubrecipesService) {}

  @Post()
  createSubrecipe(
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: CreateSubrecipeDto,
  ) {
    return this.subrecipesService.createSubrecipe(recipeId, dto);
  }

  @Get()
  async getSubrecipesByRecipe(@Param('id', ParseIntPipe) recipeId: number) {
    return this.subrecipesService.getSubrecipesByRecipe(recipeId);
  }
}
