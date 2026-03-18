import { IsOptional, IsString, IsInt, IsUrl } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsInt()
  category_id: number;

  @IsOptional()
  @IsInt()
  country_id?: number;

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
  introduction?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;
}
