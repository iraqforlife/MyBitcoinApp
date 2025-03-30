import { HttpHeaders, httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { VehicleResponse } from '../dto/vehicle-response.dto';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {
  getAll(vehicleModel: Signal<string>) {
    return httpResource<VehicleResponse>(() => ({
      url: `https://swapi.py4e.com/api/vehicles`,
      params: { search: vehicleModel() },
      headers: new HttpHeaders({}).set('skip-baseurl-interceptor', 'true'),
    }));
  }
}
