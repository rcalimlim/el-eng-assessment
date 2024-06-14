import { Foodtruck } from '../entities/foodtruck.entity';

type RequiredFoodtruckProps = Pick<Foodtruck, 'applicant' | 'locationId'>;

export class CreateFoodtruckDto implements RequiredFoodtruckProps {
  public applicant: string;
  public locationId: number;
}
