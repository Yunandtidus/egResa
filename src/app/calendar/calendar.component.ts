
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
export class CalendarComponent implements OnInit {

    public loading:boolean = true;

    constructor(private router:Router, private roomService: HttpRoomService) {
    }

    headerConfig = {
        left:"prev,next today",
        center: "title",
        right: "month, agendaWeek, agendaDay"
    }

    events: any[];

    ngOnInit(){}

    handleDayClick(event) {
        //event.view 
        console.log(event.date);
        console.log("ajout de session" + event.date);
        this.roomService.addSession(1, event.date, 90)
            .subscribe(
                result => {console.log("session creation ok", result); }, 
                e => { console.log(e, "ko")}                
            );
    }

    loadCalendar(event) {
        let start = event.view.start;
        let end = event.view.end;
        this.loading=true;
        this.roomService.loadRoomPlanning(1, start.toDate(), end.toDate())
            .subscribe(
                planning => {
                    this.loading=false;
                    this.events = [];
                    for (let a of planning) {
                        this.events.push({
                            title: a.is_free ? "Disponible" :"Indisponible", 
                            start: a.hour_start, 
                            end: a.hour_end,
                            id_availability: a.id_availability,
                            className : a.is_free ? "free" : ""
                        });
                    }
                },
                e => {
                    this.loading=false;
                    console.log(e, "ko")
                }  
        );
    }

    handleEventClick(event){
        console.log(event.calEvent);
        let createSessionModel : CreateSessionModel = new CreateSessionModel();
        createSessionModel.startDateTime = event.calEvent.start;
        createSessionModel.idAvailability = event.calEvent.id_availability;
        this.roomService.createSessionData = createSessionModel;
        this.router.navigate(['/reservation']);
    }
}