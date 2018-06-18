import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { CreationReservationComponent } from './reservation/reservation-creation.component';
import { ValidationReservationComponent } from './reservation/reservation-validation.component';
import { ReservationOkComponent } from './reservation/reservation-ok/reservation-ok.component';
import { AdminComponent } from './admin/admin.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: CalendarComponent },
    { path: 'reservation', component: CreationReservationComponent },
    { path: 'reservation/:subscriber_id/:password/:session_id', component: ValidationReservationComponent },
    { path: 'reservation/creation_ok', component: ReservationOkComponent},
    { path: 'admin', component: AdminComponent }
];