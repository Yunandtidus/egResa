import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { CreationReservationComponent } from './reservation/reservation-creation.component';
import { UpdateReservationComponent } from './reservation/reservation-update.component';
import { ReservationOkComponent } from './reservation/reservation-ok/reservation-ok.component';
import { ReservationValidatedComponent } from './reservation/reservation-validated/reservation-validated.component';
import { AdminComponent } from './admin/admin.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: CalendarComponent },
    { path: 'reservation', component: CreationReservationComponent },
    { path: 'reservation/:subscriber_id/:password/:session_id', component: UpdateReservationComponent },
    { path: 'reservation/creation_ok', component: ReservationOkComponent},
    { path: 'reservation/validation_ok', component: ReservationValidatedComponent},
    { path: 'admin', component: AdminComponent }
];