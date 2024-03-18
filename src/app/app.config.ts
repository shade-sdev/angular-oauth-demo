import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/AuthInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule,
      HttpClientXsrfModule.withOptions({headerName: "X-XSRF-TOKEN", cookieName: "XSRF-TOKEN"})),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ]
};
