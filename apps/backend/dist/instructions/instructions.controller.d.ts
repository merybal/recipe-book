import { InstructionsService } from './instructions.service';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';
export declare class InstructionsController {
    private readonly instructionsService;
    constructor(instructionsService: InstructionsService);
    addInstructions(recipeId: string, data: CreateInstructionsDto): Promise<import("generated/prisma").Prisma.BatchPayload>;
}
