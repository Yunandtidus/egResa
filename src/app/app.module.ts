import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { rootRouterConfig } from './app.routes';

import { RoomService } from './api/room/room.service';
import { AuthService } from './api/auth/auth.service';

import { MyDatePickerModule } from 'mydatepicker';

import { HttpRoomService } from './api/room/room-http.service';
import { MockRoomService } from './api/room/room-mock.service';
import { LoggerAlertService } from './utils/logger-alert.service';
import { HttpAuthService } from './api/auth/auth-http.service';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatepickerComponent } from './calendar/datepicker/datepicker.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
      AppComponent,

    CalendarComponent,
    DatepickerComponent,
    ReservationComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
	
	MyDatePickerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: 'AuthService', useClass: HttpAuthService },
    { provide: 'RoomService', useClass: HttpRoomService },
    { provide: 'LoggerService', useClass: LoggerAlertService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
