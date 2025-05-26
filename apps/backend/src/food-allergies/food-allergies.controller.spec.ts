import { Test, TestingModule } from '@nestjs/testing';
import { FoodAllergiesController } from './food-allergies.controller';

describe('FoodAllergiesController', () => {
  let controller: FoodAllergiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodAllergiesController],
    }).compile();

    controller = module.get<FoodAllergiesController>(FoodAllergiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
