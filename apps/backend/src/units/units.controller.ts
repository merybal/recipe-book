import { Controller, Get, Query } from '@nestjs/common';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  getUnits(@Query('locale') locale?: string) {
    return this.unitsService.findAll(locale);
  }
}
