import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  cooking_time?: string;

  @IsOptional()
  @IsInt()
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
  @IsNumber({}, { each: true })
  foodAllergyIds?: number[];
}
