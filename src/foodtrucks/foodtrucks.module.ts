import { Module } from '@nestjs/common';
import { FoodtrucksService } from './foodtrucks.service';
import { FoodtrucksController } from './foodtrucks.controller';

@Module({
  controllers: [FoodtrucksController],
  providers: [FoodtrucksService],
})
export class FoodtrucksModule {}
