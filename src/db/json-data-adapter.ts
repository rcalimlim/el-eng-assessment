import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { DataProviderAdapter } from './data-provider-adapter';
import { Injectable } from '@nestjs/common';
import { Foodtruck } from 'src/foodtrucks/entities/foodtruck.entity';
import { UpdateFoodtruckDto } from 'src/foodtrucks/dto/update-foodtruck.dto';
import { CreateFoodtruckDto } from 'src/foodtrucks/dto/create-foodtruck.dto';

const JSON_FILE_PATH = path.join(__dirname, 'fixtures.json');

@Injectable()
export class JsonDataProviderAdapter implements DataProviderAdapter {
  private read(): Foodtruck[] {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
      throw new Error('data connection failed');
    }
  }

  private write(data: Foodtruck[]) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2));
  }

  public async getAll() {
    const trucks = this.read();
    const withIds = trucks.map((truck) => {
      truck.id = uuidv4();
      return truck;
    });
    this.write(withIds);
    return trucks;
  }

  public async getById(id: string) {
    const data = this.read();
    return data.find((item) => item.id === id);
  }

  public async create(data: CreateFoodtruckDto) {
    const currentData = this.read();
    const newData = data as Foodtruck;
    currentData.push(newData);
    this.write(currentData);
    return newData;
  }

  public async update(id: string, data: UpdateFoodtruckDto) {
    const currentData = this.read();
    const index = currentData.findIndex((item: any) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    currentData[index] = { id, ...data } as Foodtruck;
    this.write(currentData);
    return currentData[index];
  }

  public async delete(id: string) {
    const currentData = this.read();
    const newData = currentData.filter((item: any) => item.id !== id);
    this.write(newData);
  }
}
