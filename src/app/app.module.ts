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
import { CreationReservationComponent } from './reservation/reservation-creation.component';
import { UpdateReservationComponent } from './reservation/reservation-update.component';
import { AdminComponent } from './admin/admin.component';
import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';
import { HeaderComponent } from './header/header.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
      AppComponent,

    CalendarComponent,
    DatepickerComponent,
    CreationReservationComponent,
    UpdateReservationComponent,
    AdminComponent,
    CalendarDetailsComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,   
    RouterModule.forRoot(rootRouterConfig),	
    MyDatePickerModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '50px',
      primaryColour: '#286090', 
      secondaryColour: '#286090', 
      tertiaryColour: '#286090'
  })
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
