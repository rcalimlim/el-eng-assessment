import { Injectable } from '@nestjs/common';
import { CreateFoodtruckDto } from './dto/create-foodtruck.dto';
import { UpdateFoodtruckDto } from './dto/update-foodtruck.dto';

@Injectable()
export class FoodtrucksService {
  create(createFoodtruckDto: CreateFoodtruckDto) {
    return 'This action adds a new foodtruck';
  }

  findAll() {
    return `This action returns all foodtrucks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodtruck`;
  }

  update(id: number, updateFoodtruckDto: UpdateFoodtruckDto) {
    return `This action updates a #${id} foodtruck`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodtruck`;
  }
}
