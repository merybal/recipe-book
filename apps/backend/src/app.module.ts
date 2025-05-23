import { Module } from '@nestjs/common';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { InstructionsModule } from './instructions/instructions.module';

@Module({
  imports: [RecipesModule, IngredientsModule, InstructionsModule],
})
export class AppModule {}
