import { Controller, Get, Post, Body } from '@nestjs/common';
import { FoodAllergiesService } from './food-allergies.service';
import { CreateFoodAllergyDto } from './dto/create-food-allergy.dto';

@Controller('food-allergies')
export class FoodAllergiesController {
  constructor(private readonly foodAllergiesService: FoodAllergiesService) {}

  @Post()
  create(@Body() createFoodAllergyDto: CreateFoodAllergyDto) {
    return this.foodAllergiesService.create(createFoodAllergyDto.name);
  }

  @Get()
  findAll() {
    return this.foodAllergiesService.findAll();
  }
}
