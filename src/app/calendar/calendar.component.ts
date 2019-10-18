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

    adminIdRoom = 0;

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
            if (this.adminIdRoom == 0){
              this.adminIdRoom = parseInt(prompt("IdRoom = ", "1"));
            }
            this.roomService.addSession(this.adminIdRoom, event.date.toDate(), 90)
            .subscribe(
                result => {
                    this.loading = false;
                    this.events = [];
                    this.loadCalendar(event, 1);
                    this.loadCalendar(event, 2);
                },
                e => {
                    this.loading = false;
                }
            );
        }
    }

    loadCalendar(event, idRoom) {
        const start = event.view.start;
        const end = event.view.end;
        this.loading = true;
        this.roomService.loadRoomPlanning(idRoom, start.toDate(), end.toDate())
            .subscribe(
                planning => {
                    this.loading = false;
                    console.log(planning);
                    for (const a of planning) {
                        var startHour = new Date(a.hour_start);
                        this.events.push({
                            title: (a.is_free ? 'Disponible' : 'Indisponible') + '\n'+ (idRoom == 1 ? '' :
                            'Halloween'),
                            start: a.hour_start,
                            end: a.hour_end,
                            backgroundColor : this.couleur,
                            id_room: idRoom,
                            id_availability: a.id_availability,
                            className : (a.is_free ? 'free' : 'notfree') + ' room-'+idRoom,
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
        createSessionModel.idRoom = event.calEvent.id_room;
        this.roomService.createSessionData = createSessionModel;
        this.router.navigate(['/reservation']);
    }
}
