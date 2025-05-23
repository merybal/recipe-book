import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';

@Injectable()
export class InstructionsService {
  constructor(private prisma: PrismaService) {}

  async addInstructions(recipeId: number, data: CreateInstructionsDto) {
    const instructionsToCreate = data.instructions.flatMap((section) =>
      section.sectionBody.map((body) => ({
        recipe_id: recipeId,
        subrecipe_title: section.sectionTitle,
        body,
      })),
    );

    return this.prisma.instructions.createMany({
      data: instructionsToCreate,
    });
  }
}
