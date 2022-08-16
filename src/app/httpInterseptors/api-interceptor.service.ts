import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {mergeMap, Observable, switchMap, tap} from "rxjs";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {environment} from "../../environments/environment";

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private auth: OidcSecurityService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const isApiUrl = request.url.includes('/api/');
    if (!isApiUrl) {
      return next.handle(request);
    }

    return this.auth.isAuthenticated().pipe(
      tap((isAuth) => {
        if (!isAuth && !environment.production) {
          console.warn("the user is not authenticated, the api request will not be approved.", request)
        }
      }),
      mergeMap(() => this.auth.getIdToken()),
      switchMap((idToken) => {
        const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${idToken}`)
        });

        return next.handle(authReq);
      })
    );
  }
}
