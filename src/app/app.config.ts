import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

const googleOAuthClientId = '409882570176-6r0qoud42bh9u9n9ek8ud6eb9ort551q.apps.googleusercontent.com';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Dodanie obsługi API fetch
    importProvidersFrom(FormsModule), // Dodanie FormsModule (jeśli potrzebne)
    provideClientHydration(), // Dodanie klienta hydracji (jeśli używasz SSR)
     {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,  // optional
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(googleOAuthClientId),
              },
            ],
          } as SocialAuthServiceConfig,
        },
  ]
};
