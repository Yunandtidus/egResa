import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { CreationReservationComponent } from './reservation/reservation-creation.component';
import { UpdateReservationComponent } from './reservation/reservation-update.component';
import { ValidationComponent } from './reservation/validation/validation.component';
import { AdminComponent } from './admin/admin.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: CalendarComponent },
    { path: 'reservation', component: CreationReservationComponent },
    { path: 'reservation/:subscriber_id/:password/:session_id', component: UpdateReservationComponent },
    { path: 'validation/:session_id/:code', component: ValidationComponent },
    { path: 'admin', component: AdminComponent }
];