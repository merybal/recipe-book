import { IsString, Length } from 'class-validator';

export class CreateDietaryRestrictionDto {
  @IsString()
  @Length(1, 255)
  name: string;
}
