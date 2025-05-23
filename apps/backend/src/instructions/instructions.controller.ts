import { Controller, Post, Param, Body } from '@nestjs/common';
import { InstructionsService } from './instructions.service';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';

@Controller('recipes/:recipeId/instructions')
export class InstructionsController {
  constructor(private readonly instructionsService: InstructionsService) {}

  @Post(':id/instructions')
  async addInstructions(
    @Param('id') recipeId: string,
    @Body() data: CreateInstructionsDto,
  ) {
    return this.instructionsService.addInstructions(+recipeId, data);
  }
}
