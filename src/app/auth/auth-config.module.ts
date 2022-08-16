import {NgModule} from '@angular/core';
import {AuthModule, LogLevel} from 'angular-auth-oidc-client';

export const authConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ULYez0ugI',
  redirectUrl: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  clientId: '___your__client_id____',
  scope: 'openid profile email', // 'openid profile offline_access ' + your scopes
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
  logLevel: LogLevel.Debug
}

@NgModule({
  imports: [AuthModule.forRoot({
    config: authConfig
  })],
  exports: [AuthModule],
})
export class AuthConfigModule {
}
