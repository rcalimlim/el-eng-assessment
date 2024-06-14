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
    return this.read();
  }

  public async getById(id: string) {
    return this.read().find((item) => item.id === id);
  }

  public async create(data: CreateFoodtruckDto) {
    const currentData = this.read();
    const newData = data as Foodtruck;
    const id = uuidv4();
    currentData.push({ id, ...newData });
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
    const newData = this.read().filter((item: any) => item.id !== id);
    this.write(newData);
  }
}
