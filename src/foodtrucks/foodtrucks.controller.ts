import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodtrucksService } from './foodtrucks.service';
import { CreateFoodtruckDto } from './dto/create-foodtruck.dto';
import { UpdateFoodtruckDto } from './dto/update-foodtruck.dto';

@Controller('foodtrucks')
export class FoodtrucksController {
  constructor(private readonly foodtrucksService: FoodtrucksService) {}

  @Post()
  create(@Body() createFoodtruckDto: CreateFoodtruckDto) {
    return this.foodtrucksService.create(createFoodtruckDto);
  }

  @Get()
  findAll() {
    return this.foodtrucksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodtrucksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodtruckDto: UpdateFoodtruckDto,
  ) {
    return this.foodtrucksService.update(+id, updateFoodtruckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodtrucksService.remove(+id);
  }
}
