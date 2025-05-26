import { IsString, Length } from 'class-validator';

export class CreateFoodAllergyDto {
  @IsString()
  @Length(1, 255)
  name: string;
}
