import * as fs from 'fs';
import { DataProviderAdapter } from './data-provider-adapter';

const JSON_FILE_PATH = './fixtures.json';

export class JsonAdapter implements DataProviderAdapter {
  private readData() {
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    return JSON.parse(data);
  }

  private writeData(data: any) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2));
  }

  async getAll() {
    return this.readData();
  }

  async getById(id: number) {
    const data = this.readData();
    return data.find((item: any) => item.id === id);
  }

  async create(data: any) {
    const currentData = this.readData();
    // const newId = currentData.length
    //   ? Math.max(...currentData.map((item: any) => item.id)) + 1
    //   : 1;
    const newData = { id: newId, ...data };
    currentData.push(newData);
    this.writeData(currentData);
    return newData;
  }

  async update(id: number, data: any) {
    const currentData = this.readData();
    const index = currentData.findIndex((item: any) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    currentData[index] = { id, ...data };
    this.writeData(currentData);
    return currentData[index];
  }

  async delete(id: number) {
    const currentData = this.readData();
    const newData = currentData.filter((item: any) => item.id !== id);
    this.writeData(newData);
  }
}
