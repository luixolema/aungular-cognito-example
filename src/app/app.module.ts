import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthConfigModule} from './auth/auth-config.module';
import {httpInterceptorProviders} from "./httpInterseptors";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthConfigModule
  ],
  providers: [
    [httpInterceptorProviders],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
