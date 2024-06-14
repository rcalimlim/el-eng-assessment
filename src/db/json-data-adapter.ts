import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { DataProviderAdapter, keyMapping } from './data-provider-adapter';
import { Injectable } from '@nestjs/common';
import { Foodtruck } from 'src/foodtrucks/entities/foodtruck.entity';
import { UpdateFoodtruckDto } from 'src/foodtrucks/dto/update-foodtruck.dto';
import { CreateFoodtruckDto } from 'src/foodtrucks/dto/create-foodtruck.dto';

const JSON_FILE_PATH = path.join(__dirname, 'fixtures.json');

enum JsonDataProviderAdapterErrors {
  NOT_FOUND = 'No foodtruck could be found with that id',
}

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

  public async getAll(): Promise<Foodtruck[]> {
    // I didn't get a chance to dive into pagination in NestJS, but
    // I would add it if I had more time
    return this.read();
  }

  public async getById(id: string): Promise<Foodtruck> {
    // This is not scalable and is not the approach I would use to retrieve
    // a foodtruck from a real database. Fortunately NestJS is an IoC framework,
    // so I'll be able to swap this class out for a db connection class
    // with the same interface without rewriting any foodtruck service code
    const item = (await this.getAll()).find(
      (truck: Foodtruck) => truck.id === id,
    );
    if (item === undefined) {
      throw new Error(JsonDataProviderAdapterErrors.NOT_FOUND);
    }
    return item;
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
    const trucks = await this.getAll();
    const idx = trucks.findIndex((truck) => truck.id === id);
    if (idx === -1) {
      throw new Error(JsonDataProviderAdapterErrors.NOT_FOUND);
    }
    const truck = trucks[idx];
    trucks[idx] = { id, ...truck, ...data };
    this.write(trucks);
    return trucks[idx];
  }

  public async delete(id: string) {
    const newData = this.read().filter((item: any) => item.id !== id);
    this.write(newData);
  }
}
