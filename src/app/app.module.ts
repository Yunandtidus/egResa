import { BrowserModule } from '@angular/platform-browser';

import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { rootRouterConfig } from './app.routes';

import { MyDatePickerModule } from 'mydatepicker';

import { HttpApi } from './api/http-api.service';
import { HttpRoomService } from './api/room/room-http.service';
import { HttpAuthService } from './api/auth/auth-http.service';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatepickerComponent } from './calendar/datepicker/datepicker.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminComponent } from './admin/admin.component';
import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';





export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
      AppComponent,

    CalendarComponent,
    DatepickerComponent,
    ReservationComponent,
    AdminComponent,
    CalendarDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,   
    RouterModule.forRoot(rootRouterConfig),	
	  MyDatePickerModule
  ],
  providers: [
    HttpApi,
    HttpAuthService,
    HttpRoomService,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
