import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptorService} from "./api-interceptor.service";


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true},
];
