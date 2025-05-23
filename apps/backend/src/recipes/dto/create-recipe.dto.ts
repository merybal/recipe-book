import { IsString, IsOptional, IsInt } from 'class-validator';

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
}
