import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: CalendarComponent }
];

