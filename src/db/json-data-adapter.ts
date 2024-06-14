import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { DataProviderAdapter, keyMapping } from './data-provider-adapter';
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
    function transformKeys(obj: { [key: string]: any }): {
      [key: string]: any;
    } {
      const result: { [key: string]: any } = {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = keyMapping[key] || key;
          result[newKey] = obj[key];
        }
      }

      return result;
    }
    const mapped = trucks.map(transformKeys);
    return mapped;
  }

  public async getById(id: string) {
    return this.read().find((item) => item.id === id);
  }

  public async create(data: CreateFoodtruckDto): Promise<Foodtruck> {
    const currentData = this.read();
    const id = uuidv4();
    const newRecord = { id, ...data };
    currentData.push(newRecord);
    this.write(currentData);
    return newRecord;
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
