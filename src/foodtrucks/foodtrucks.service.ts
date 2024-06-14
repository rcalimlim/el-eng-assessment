import { Injectable } from '@nestjs/common';
import { CreateFoodtruckDto } from './dto/create-foodtruck.dto';
import { UpdateFoodtruckDto } from './dto/update-foodtruck.dto';
import { Foodtruck } from './entities/foodtruck.entity';
import { JsonDataProviderAdapter } from 'src/db/json-data-adapter';

@Injectable()
export class FoodtrucksService {
  constructor(private readonly db: JsonDataProviderAdapter) {}

  public async create(createFoodtruckDto: CreateFoodtruckDto): Promise<void> {
    await this.db.create(createFoodtruckDto);
  }

  public async findAll(): Promise<Foodtruck[]> {
    return this.db.getAll() as unknown as Foodtruck[];
  }

  public async findOne(id: string): Promise<Foodtruck> {
    return this.db.getById(id);
  }

  public async update(
    id: string,
    updateFoodtruckDto: UpdateFoodtruckDto,
  ): Promise<Foodtruck> {
    return this.db.update(id, updateFoodtruckDto);
  }

  public async remove(id: string) {
    await this.db.delete(id);
  }
}
