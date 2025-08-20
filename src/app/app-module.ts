import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { LoginComponent } from './features/login/page/login.component'; 
import { provideHttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token'); 
}

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LoginComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'], 
        disallowedRoutes: ['http://localhost:4200/login'], 
      },
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
