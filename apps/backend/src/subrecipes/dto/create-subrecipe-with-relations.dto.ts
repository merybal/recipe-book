import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIngredientDto } from '@/ingredients/dto/create-ingredient.dto';

export class CreateSubrecipeWithRelationsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  instructions: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];
}
