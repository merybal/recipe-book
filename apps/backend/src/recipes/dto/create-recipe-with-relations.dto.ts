import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRecipeDto } from './create-recipe.dto';
import { CreateSubrecipeWithRelationsDto } from '@/subrecipes/dto/create-subrecipe-with-relations.dto';

class SourceItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}

export class CreateRecipeWithRelationsDto extends CreateRecipeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubrecipeWithRelationsDto)
  subrecipes: CreateSubrecipeWithRelationsDto[];

  @IsArray()
  @IsInt({ each: true })
  dietary_restriction_ids: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  subcategory_ids?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SourceItemDto)
  source?: SourceItemDto[];
}
