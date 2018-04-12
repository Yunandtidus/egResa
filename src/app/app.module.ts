import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { rootRouterConfig } from './app.routes';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScheduleModule } from 'primeng/schedule';

import { HttpApi } from './api/http-api.service';
import { HttpRoomService } from './api/room/room-http.service';
import { HttpAuthService } from './api/auth/auth-http.service';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreationReservationComponent } from './reservation/reservation-creation.component';
import { UpdateReservationComponent } from './reservation/reservation-update.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
      AppComponent,

    CalendarComponent,
    CreationReservationComponent,
    UpdateReservationComponent,
    AdminComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,   
    RouterModule.forRoot(rootRouterConfig),	
    ScheduleModule,
    ProgressSpinnerModule
  ],
  providers: [
    HttpApi,
    HttpAuthService,
    HttpRoomService,
    //{ provide: LOCALE_ID, useValue: "fr" },
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
