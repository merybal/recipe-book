import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRecipeDto } from './create-recipe.dto';
import { CreateSubrecipeWithRelationsDto } from '@/subrecipes/dto/create-subrecipe-with-relations.dto';

export class CreateRecipeWithRelationsDto extends CreateRecipeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubrecipeWithRelationsDto)
  subrecipes: CreateSubrecipeWithRelationsDto[];

  @IsArray()
  @IsInt({ each: true })
  food_allergy_ids: number[];
}
