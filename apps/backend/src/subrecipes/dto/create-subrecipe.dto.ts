import { IsOptional, IsString } from 'class-validator';

export class CreateSubrecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  instructions: string;
}
