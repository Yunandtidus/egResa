import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { rootRouterConfig } from './app.routes';

import { RoomService } from './api/room.service';

import { MyDatePickerModule } from 'mydatepicker';

import { HttpRoomService } from './api/room-http.service';
import { MockRoomService } from './api/room-mock.service';
import { LoggerAlertService } from './utils/logger-alert.service';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatepickerComponent } from './calendar/datepicker/datepicker.component';
import { ReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [
      AppComponent,

    CalendarComponent,
    DatepickerComponent,
    ReservationComponent
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
      { provide: 'RoomService', useClass: MockRoomService },
    { provide: 'LoggerService', useClass: LoggerAlertService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
