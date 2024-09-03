import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
  provideToastr(), provideRouter(routes, withViewTransitions()), provideClientHydration(),
  provideHttpClient(withFetch()), importProvidersFrom(RouterModule, BrowserAnimationsModule, ToastrModule)
  ]
};
