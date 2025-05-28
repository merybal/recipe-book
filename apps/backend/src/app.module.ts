import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { SubrecipesModule } from './subrecipes/subrecipes.module';
import { FoodAllergiesModule } from './food-allergies/food-allergies.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [RecipesModule, SubrecipesModule, FoodAllergiesModule, UnitsModule],
})
export class AppModule {}
