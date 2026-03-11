import { Module } from '@nestjs/common';
import { DietaryRestrictionsController } from './dietary-restrictions.controller';
import { DietaryRestrictionsService } from './dietary-restrictions.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DietaryRestrictionsController],
  providers: [DietaryRestrictionsService, PrismaService],
})
export class DietaryRestrictionsModule {}
