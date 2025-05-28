import { Controller, Get, Post, Body } from '@nestjs/common';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  createUnit(@Body() body: { name: string }) {
    return this.unitsService.createUnit(body.name);
  }

  @Get()
  getUnits() {
    return this.unitsService.getUnits();
  }
}
