import { Foodtruck } from 'src/foodtrucks/entities/foodtruck.entity';

export interface DataProviderAdapter {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
}

export function transformKeys(obj: { [key: string]: any }): {
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

export const keyMapping: { [key: string]: string } = {
  locationid: 'locationId',
  Applicant: 'applicant',
  FacilityType: 'facilityType',
  cnn: 'cnn',
  LocationDescription: 'locationDescription',
  Address: 'address',
  blocklot: 'blockLot',
  block: 'block',
  lot: 'lot',
  permit: 'permit',
  Status: 'status',
  FoodItems: 'foodItems',
  X: 'x',
  Y: 'y',
  Latitude: 'latitude',
  Longitude: 'longitude',
  Schedule: 'schedule',
  dayshours: 'daysHours',
  NOISent: 'noiSent',
  Approved: 'approved',
  Received: 'received',
  PriorPermit: 'priorPermit',
  ExpirationDate: 'expirationDate',
  Location: 'location',
  'Fire Prevention Districts': 'firePreventionDistricts',
  'Police Districts': 'policeDistricts',
  'Supervisor Districts': 'supervisorDistricts',
  'Zip Codes': 'zipCodes',
  'Neighborhoods (old)': 'neighborhoodsOld',
  id: 'id',
};
