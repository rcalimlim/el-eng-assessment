import { Test, TestingModule } from '@nestjs/testing';
import { FoodtrucksService } from './foodtrucks.service';

describe('FoodtrucksService', () => {
  let service: FoodtrucksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodtrucksService],
    }).compile();

    service = module.get<FoodtrucksService>(FoodtrucksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
