import { IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class AddFoodAllergiesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  foodAllergyIds: number[];
}
