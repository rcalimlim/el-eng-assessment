import { Test, TestingModule } from '@nestjs/testing';
import { FoodtrucksController } from './foodtrucks.controller';
import { FoodtrucksService } from './foodtrucks.service';

describe('FoodtrucksController', () => {
  let controller: FoodtrucksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodtrucksController],
      providers: [FoodtrucksService],
    }).compile();

    controller = module.get<FoodtrucksController>(FoodtrucksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
