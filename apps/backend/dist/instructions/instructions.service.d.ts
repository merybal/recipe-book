import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInstructionsDto } from '../instructions/dto/create-instructions.dto';
export declare class InstructionsService {
    private prisma;
    constructor(prisma: PrismaService);
    addInstructions(recipeId: number, data: CreateInstructionsDto): Promise<import("generated/prisma").Prisma.BatchPayload>;
}
