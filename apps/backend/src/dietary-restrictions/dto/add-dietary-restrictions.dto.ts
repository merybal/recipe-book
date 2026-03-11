import { IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class AddDietaryRestrictionsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  dietaryRestrictionIds: number[];
}
