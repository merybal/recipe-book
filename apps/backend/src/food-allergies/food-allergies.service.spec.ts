import { Test, TestingModule } from '@nestjs/testing';
import { FoodAllergiesService } from './food-allergies.service';

describe('FoodAllergiesService', () => {
  let service: FoodAllergiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodAllergiesService],
    }).compile();

    service = module.get<FoodAllergiesService>(FoodAllergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
