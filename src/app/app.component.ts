import {Component, OnInit} from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult
} from "angular-auth-oidc-client";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  configuration$: Observable<OpenIdConfiguration> | undefined;
  userDataChanged$: Observable<OidcClientNotification<any>> | undefined;
  userData$: Observable<UserDataResult> | undefined;
  isAuthenticated = false;

  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({isAuthenticated}) => console.log('app authenticated', isAuthenticated));

    this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      this.isAuthenticated = isAuthenticated;

      console.warn('authenticated: ', isAuthenticated);
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
    const params = new HttpParams()
      .set('client_id', '___your__client_id____')
      .set('logout_uri', window.location.origin)
    ;
    location.assign('https://lemstudy.auth.us-east-1.amazoncognito.com/logout?' + params.toString());
  }
}
