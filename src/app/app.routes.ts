import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminComponent } from './admin/admin.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: CalendarComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'admin', component: AdminComponent }
];