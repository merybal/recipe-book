import { Controller, Get, Post, Body } from '@nestjs/common';
import { DietaryRestrictionsService } from './dietary-restrictions.service';
import { CreateDietaryRestrictionDto } from './dto/create-dietary-restriction.dto';

@Controller('dietary-restrictions')
export class DietaryRestrictionsController {
  constructor(
    private readonly dietaryRestrictionsService: DietaryRestrictionsService,
  ) {}

  @Post()
  create(@Body() dto: CreateDietaryRestrictionDto) {
    return this.dietaryRestrictionsService.create(dto);
  }

  @Get()
  getDietaryRestrictions() {
    return this.dietaryRestrictionsService.getDietaryRestrictions();
  }
}
