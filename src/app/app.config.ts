import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Dodanie obsługi API fetch
    importProvidersFrom(FormsModule), // Dodanie FormsModule (jeśli potrzebne)
    provideClientHydration(), // Dodanie klienta hydracji (jeśli używasz SSR)
  ]
};
