import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  findAll(
    @Query('locale') locale?: string,
    @Query('category_id') categoryId?: string,
    @Query('has_recipes') hasRecipes?: string,
  ) {
    const catId = categoryId ? parseInt(categoryId, 10) : undefined;
    const onlyWithRecipes =
      hasRecipes === 'true' || hasRecipes === '1';
    return this.subcategoriesService.findAll(
      locale,
      catId,
      onlyWithRecipes,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale?: string,
  ) {
    const subcategory = await this.subcategoriesService.findOne(id, locale);
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }
    return subcategory;
  }
}
