import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { LoginComponent } from './features/login/page/login.component'; 
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LoginComponent 
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
