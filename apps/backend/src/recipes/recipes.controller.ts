import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RecipesService } from './recipes.service';
import { PdfService } from '../pdf/pdf.service';
import { recipeToPdfData } from '../pdf/recipe-to-pdf-data';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { CreateRecipeWithRelationsDto } from './dto/create-recipe-with-relations.dto';
import { AddDietaryRestrictionsDto } from '@/dietary-restrictions/dto/add-dietary-restrictions.dto';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly pdfService: PdfService,
  ) {}

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Post()
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @Post('full')
  async createFullRecipe(@Body() dto: CreateRecipeWithRelationsDto) {
    return this.recipesService.createFullRecipe(dto);
  }

  @Put(':id/full')
  async updateFullRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRecipeWithRelationsDto,
  ) {
    return this.recipesService.updateFullRecipe(id, dto);
  }

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

  @Get(':id/pdf')
  async getRecipePdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const recipe = await this.recipesService.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const pdfData = recipeToPdfData(recipe as Parameters<typeof recipeToPdfData>[0]);
    const buffer = await this.pdfService.generateRecipePdf(pdfData);
    const filename = `${recipe.title.replace(/[^a-z0-9áéíóúñü\s-]/gi, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  }

  /** Temporary: PDF preview (inline, no download). Remove when done editing the template. */
  @Get(':id/pdf-preview')
  async getRecipePdfPreview(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const recipe = await this.recipesService.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    const pdfData = recipeToPdfData(recipe as Parameters<typeof recipeToPdfData>[0]);
    const buffer = await this.pdfService.generateRecipePdf(pdfData);
    const filename = `${recipe.title.replace(/[^a-z0-9áéíóúñü\s-]/gi, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.send(buffer);
  }

  @Get(':id')
  async getRecipe(@Param('id', ParseIntPipe) id: number) {
    const recipe = await this.recipesService.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }
}
