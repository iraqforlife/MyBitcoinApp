import { Vehicle } from './vehicle.dto';

export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[];
}
