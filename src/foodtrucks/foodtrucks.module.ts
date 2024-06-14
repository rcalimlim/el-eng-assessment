import { Module } from '@nestjs/common';
import { FoodtrucksService } from './foodtrucks.service';
import { FoodtrucksController } from './foodtrucks.controller';
import { JsonDataProviderAdapter } from 'src/db/json-data-adapter';

@Module({
  controllers: [FoodtrucksController],
  providers: [FoodtrucksService, JsonDataProviderAdapter],
})
export class FoodtrucksModule {}
