import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { Vehicle } from './../../dto/vehicle.dto';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehiculeService } from '../../services/vehicule.service';
import { setErrorMessage } from '../../utils/error-message';

@Component({
  selector: 'app-vehicule',
  imports: [FormsModule],
  templateUrl: './vehicule.component.html',
})
export class VehiculeComponent {
  pageTitle = 'StarWars Vehicles';

  private service = inject(VehiculeService);

  // Signals to support the template
  vehicleModels = signal<string[]>([
    'landspeeder',
    'airspeeder',
    'bomber',
    'transport',
    'crawler',
    'skyhopper',
    'starfighter',
    'barge',
  ]);
  selectedModel = signal<string>('');
  // Resource to retrieve the data
  VehicleResource = this.service.getAll(this.selectedModel);

  // Resource signals
  vehicles = computed(
    () => this.VehicleResource.value()?.results ?? ([] as Vehicle[])
  );
  error = computed(() => this.VehicleResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'vehicle'));
  isLoading = computed(() => this.VehicleResource.isLoading());
}
