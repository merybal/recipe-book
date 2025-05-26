import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { InstructionsModule } from './instructions/instructions.module';
import { FoodAllergiesModule } from './food-allergies/food-allergies.module';

@Module({
  imports: [
    RecipesModule,
    IngredientsModule,
    InstructionsModule,
    FoodAllergiesModule,
  ],
})
export class AppModule {}
