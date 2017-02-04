import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { rootRouterConfig } from './app.routes';

import { AppComponent }  from './app.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: true }),
        MyDatePickerModule
    ],
    declarations: [
        AppComponent,
        CalendarComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
