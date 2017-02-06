import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

import { rootRouterConfig } from './app.routes';

import { HttpRoomService }  from './api/room.http.service';
import { MockRoomService }  from './api/room.mock.service';
import { LoggerAlertService }  from './utils/logger.alert.service';

import { AppComponent }  from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatepickerComponent } from './calendar/datepicker.component';
import { ReservationComponent } from './reservation/reservation.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: true }),
        HttpModule,
        MyDatePickerModule
    ],
    declarations: [
        AppComponent,
        DatepickerComponent,
        CalendarComponent,
        ReservationComponent
    ],
    providers: [
        { provide: 'RoomService', useClass: HttpRoomService },
        { provide: 'LoggerService', useClass: LoggerAlertService }
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
