import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

import { rootRouterConfig } from './app.routes';

import { RoomService }  from './api/room.service';

import { AppComponent }  from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
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
        CalendarComponent,
        ReservationComponent
    ],
    providers: [
        RoomService
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
