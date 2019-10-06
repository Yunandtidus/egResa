import { HttpAuthService } from './../api/auth/auth-http.service';

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpRoomService } from '../api/room/room-http.service';

import { AvailableSessionModel } from './../model/available-session.model';
import { RoomModel } from '../model/room.model';
import { CreateSessionModel } from './../model/create-session-model';
import { ReservationModel } from '../model/reservation.model';

import * as moment from 'moment';

@Component({
    selector: 'my-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
    couleur;
    freeclasscss;

    events: any[];
    public loading = true;
    headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
        }

    constructor(private router: Router, private roomService: HttpRoomService, private httpAuthService: HttpAuthService) {
    }

    handleDayClick(event) {
        if (this.httpAuthService.isAdmin()) {
           this.loading = true;
            this.roomService.addSession(2, event.date.toDate(), 90)
            .subscribe(
                result => {
                    this.loading = false;
                    this.loadCalendar(event);
                },
                e => {
                    this.loading = false;
                }
            );
        }
    }

    loadCalendar(event) {
        const start = event.view.start;
        const end = event.view.end;
        this.loading = true;
        this.roomService.loadRoomPlanning(2, start.toDate(), end.toDate())
            .subscribe(
                planning => {
                    this.loading = false;
                    this.events = [];
                    console.log(planning);
                    for (const a of planning) {
                        this.freeclasscss = 'freeHalloween';
                        this.events.push({
                            title: a.is_free ? 'Disponible' : 'Complet',
                            start: a.hour_start,
                            end: a.hour_end,
                            backgroundColor : this.couleur,
                            id_availability: a.id_availability,
                            className : a.is_free ? this.freeclasscss : 'notfree',
                        });
                    }
                },
                e => {
                    this.loading = false;
                }
        );
    }

    handleEventClick(event) {
        const createSessionModel: CreateSessionModel = new CreateSessionModel();
        createSessionModel.startDateTime = event.calEvent.start.toDate();
        createSessionModel.idAvailability = event.calEvent.id_availability;
        this.roomService.createSessionData = createSessionModel;
        this.router.navigate(['/reservation']);
    }
}
