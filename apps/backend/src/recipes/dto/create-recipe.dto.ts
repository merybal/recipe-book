import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsInt()
  country_id?: number;

  @IsOptional()
  @IsInt()
  cooking_time?: number;

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
  @IsUrl()
  image_url?: string;
}
