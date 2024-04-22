import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/AuthInterceptor";
import {provideHotToastConfig} from "@ngneat/hot-toast";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule,
      HttpClientXsrfModule.withOptions({headerName: "X-XSRF-TOKEN", cookieName: "XSRF-TOKEN"})),
    provideHotToastConfig(),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ]
};
