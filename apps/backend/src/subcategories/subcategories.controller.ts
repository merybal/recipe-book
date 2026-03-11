import { Controller, Get, Query } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  findAll(
    @Query('locale') locale?: string,
    @Query('category_id') categoryId?: string,
  ) {
    const catId = categoryId ? parseInt(categoryId, 10) : undefined;
    return this.subcategoriesService.findAll(locale, catId);
  }
}
