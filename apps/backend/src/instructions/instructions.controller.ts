import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';

@Controller('recipes/:recipeId/instructions')
export class InstructionsController {
  constructor(private readonly instructionsService: InstructionsService) {}

  @Post()
  async addInstructions(
    @Param('recipeId') recipeId: string,
    @Body() data: CreateInstructionsDto,
  ) {
    return this.instructionsService.addInstructions(+recipeId, data);
  }

  @Get()
  async getInstructionsByRecipeId(
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ) {
    return this.instructionsService.getInstructionsByRecipeId(recipeId);
  }
}
