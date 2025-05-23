import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class IngredientItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  amount?: string;

  @IsOptional()
  @IsString()
  unit?: string;
}

class IngredientSectionDto {
  @IsOptional()
  @IsString()
  sectionTitle?: string;

  @ValidateNested({ each: true })
  @Type(() => IngredientItemDto)
  sectionBody: IngredientItemDto[];
}

export class CreateIngredientsDto {
  @ValidateNested({ each: true })
  @Type(() => IngredientSectionDto)
  ingredients: IngredientSectionDto[];
}
