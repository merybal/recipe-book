import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { SubrecipesModule } from './subrecipes/subrecipes.module';
import { DietaryRestrictionsModule } from './dietary-restrictions/dietary-restrictions.module';
import { UnitsModule } from './units/units.module';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';

@Module({
  imports: [
    RecipesModule,
    SubrecipesModule,
    DietaryRestrictionsModule,
    UnitsModule,
    CountriesModule,
    CategoriesModule,
    SubcategoriesModule,
  ],
})
export class AppModule {}
