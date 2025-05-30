import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsInt()
  unit_id: number;
}
