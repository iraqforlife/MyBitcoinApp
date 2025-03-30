import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from './translation-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor, baseUrlInterceptor])),
    provideAnimations(),
    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslationLoader(http),
        deps: [HttpClient],
      },
    }).providers || []),
  ],
};
