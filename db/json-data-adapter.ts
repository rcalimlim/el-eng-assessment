import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { DataProviderAdapter } from './data-provider-adapter';
import { CreateFoodtruckDto } from 'src/foodtrucks/dto/create-foodtruck.dto';
import { UpdateFoodtruckDto } from 'src/foodtrucks/dto/update-foodtruck.dto';

const JSON_FILE_PATH = './fixtures.json';

export class JsonAdapter implements DataProviderAdapter {
  private read() {
    try {
      const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
      throw new Error('data connection failed');
    }
  }

  private write(data: any) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2));
  }

  public async getAll() {
    return this.read();
  }

  public async getById(id: number) {
    const data = this.read();
    return data.find((item: any) => item.id === id);
  }

  public async create(data: CreateFoodtruckDto) {
    const currentData = this.read();
    const newData = { id: uuidv4(), ...data };
    currentData.push(newData);
    this.write(currentData);
    return newData;
  }

  public async update(id: number, data: UpdateFoodtruckDto) {
    const currentData = this.read();
    const index = currentData.findIndex((item: any) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    currentData[index] = { id, ...data };
    this.write(currentData);
    return currentData[index];
  }

  public async delete(id: number) {
    const currentData = this.read();
    const newData = currentData.filter((item: any) => item.id !== id);
    this.write(newData);
  }
}
