import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { rootRouterConfig } from './app.routes';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScheduleModule } from 'primeng/schedule';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { GrowlModule } from 'primeng/growl';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/components/common/messageservice';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { HttpApi } from './api/http-api.service';
import { HttpRoomService } from './api/room/room-http.service';
import { HttpAuthService } from './api/auth/auth-http.service';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreationReservationComponent } from './reservation/reservation-creation.component';
import { ValidationReservationComponent } from './reservation/reservation-validation.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { ReservationOkComponent } from './reservation/reservation-ok/reservation-ok.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
      AppComponent,

    CalendarComponent,
    CreationReservationComponent,
    ValidationReservationComponent,
    AdminComponent,
    HeaderComponent,
    ReservationOkComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,   
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),	
    PanelModule,
    ButtonModule,
    ScheduleModule,
    ProgressSpinnerModule,
    NoopAnimationsModule,
    GrowlModule,
    DialogModule
  ],
  providers: [
    HttpApi,
    HttpAuthService,
    HttpRoomService,
    MessageService,
    //{ provide: LOCALE_ID, useValue: "fr" },
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http, RequestOptions]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
