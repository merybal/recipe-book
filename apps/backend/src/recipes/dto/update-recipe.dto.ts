import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class IngredientDto {
  @IsOptional()
  @IsString()
  subrecipe_title?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  amount?: string;

  @IsOptional()
  @IsString()
  unit?: string;
}

class InstructionDto {
  @IsOptional()
  @IsString()
  subrecipe_title?: string;

  @IsString()
  body: string;
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
  @IsString()
  servings?: string;

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
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients?: IngredientDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstructionDto)
  instructions?: InstructionDto[];
}
