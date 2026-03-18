import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class IngredientDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  unit_id: number;
}

class SubrecipeDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  instructions: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];
}

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  cooking_time?: string;

  @IsOptional()
  @IsNumber()
  cooking_temperature?: number;

  @IsOptional()
  @IsNumber()
  servings?: number;

  @IsOptional()
  @IsString()
  mold_type?: string;

  @IsOptional()
  @IsString()
  mold_size?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  foodAllergyIds?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubrecipeDto)
  subrecipes?: SubrecipeDto[];
}
