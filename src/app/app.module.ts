import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule, CookieService } from 'ngx-cookie';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/private/not-found/not-found.component';

import { AuthGuardService } from './common/services/auth.guard/auth.guard.service';
import { AuthService } from './common/services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [
    CookieService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
