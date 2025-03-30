import {
  HttpClient,
  HttpErrorResponse,
  httpResource,
} from '@angular/common/http';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { Weatherforcast } from '../dto/weatherforcast.dto';
import { setErrorMessage } from '../utils/error-message';
import { Roles } from '../enum/roles';
import { Login } from '../dto/login.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogged = signal(false);
  private loginResponse: Login | undefined = undefined;
  // for data retreiving only
  // only make 1 request. to have one thats updates, use a signal. ex : selectedProjectId ...
  private forcast = httpResource<Weatherforcast[]>('WeatherForecast');
  constructor(private http: HttpClient) {}

  get token() {
    return this.loginResponse?.token;
  }

  validateRole(role: Roles): boolean {
    return this.loginResponse?.role === role;
  }

  forcasts = computed(() => this.forcast.value() as Weatherforcast[]);
  error = computed(() => this.forcast.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Vehicle'));
  isLoading = this.forcast.isLoading;

  login(username: string, password: string) {
    const body = { email: username, password };
    this.http.post('users/login/', body).subscribe({
      next: (response) => {
        if (response) {
          var loginResponse = response as Login;
          this.isLogged.set(true);
          this.loginResponse = loginResponse;
        } else {
          console.error('Unexpected response:', response);
        }
        console.log('Login successful:', response);
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    }); // Returns an Observable
  }
}
