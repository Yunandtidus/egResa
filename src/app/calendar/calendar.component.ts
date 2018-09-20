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
        if (this.checkIsAdmin()) {
            console.log(this.checkIsAdmin());
           this.loading = true;
            this.roomService.addSession(1, event.date.toDate(), 90)
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
        this.roomService.loadRoomPlanning(1, start.toDate(), end.toDate())
            .subscribe(
                planning => {
                    this.loading = false;
                    this.events = [];
                    console.log(planning);                    
                    for (const a of planning) {
                        let timestart = moment(a.hour_start, 'YYYY-MM-DD');
                        let timeend = moment(a.hour_end, 'YYYY-MM-DD');
                        let time2 = moment('2018-10-02', 'YYYY-MM-DD');
                        let time3 = moment('2018-10-04', 'YYYY-MM-DD');

                        console.log(moment(timestart));
                        console.log(moment(time2));
                        console.log(moment(timestart).isAfter(time2));
                        console.log(moment(timeend).isBefore(time3));
                        if( moment(timestart).isAfter(time2) && moment(timeend).isBefore(time3) ){
                             this.couleur = 'blue'
                        }else{
                            this.couleur ='red';
                        }


                        this.events.push({
                            title: a.is_free ? 'Disponible' : 'Indisponible',
                            start: a.hour_start,
                            end: a.hour_end,
                            backgroundColor : this.couleur,
                            id_availability: a.id_availability,
                            className : a.is_free ? 'free' : ''
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

    checkIsAdmin() {
       return this.httpAuthService.isAdmin();

    }
}
